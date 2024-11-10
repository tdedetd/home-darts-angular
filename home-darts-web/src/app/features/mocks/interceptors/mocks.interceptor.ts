import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { mocksConfig } from '../constants/mocks-config';
import { randomIntFromInterval } from '@functions/random-int-from-interval';

@Injectable()
export class MocksInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const mockMeta = mocksConfig.find(mock => mock.regex.test(request.url));

    if (mockMeta) {
      return of(new HttpResponse({
        ...(
          mockMeta.data
          ? { body: typeof mockMeta.data === 'function' ? mockMeta.data(request) : mockMeta.data }
          : {}
        ),
        status: mockMeta.httpStatus ?? HttpStatusCode.Ok
      })).pipe(
        delay((Array.isArray(mockMeta.delay) ? randomIntFromInterval(mockMeta.delay) : mockMeta.delay) ?? 0),
        tap(response => {
          // eslint-disable-nextline no-console
          console.debug(`${request.method} ${request.url}\n`, response);
        }),
      );
    } else {
      return next.handle(request);
    }
  }
}

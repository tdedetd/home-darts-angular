import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MocksInterceptor } from './interceptors/mocks.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MocksInterceptor, multi: true },
  ],
})
export class MocksModule { }

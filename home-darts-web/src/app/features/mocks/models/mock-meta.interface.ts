import { HttpRequest, HttpStatusCode } from '@angular/common/http';

export interface MockMeta {
  regex: RegExp;
  data?: object | ((request: HttpRequest<unknown>) => object);
  delay?: number | [number, number];
  httpStatus?: HttpStatusCode;
}

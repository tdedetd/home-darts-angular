import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

// TODO: temp type
export type RequestWithData<
  Data = any,
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & { data?: Data };

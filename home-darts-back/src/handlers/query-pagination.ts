import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { PaginationParams } from '../utils/models/pagination-params.interface.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const queryPagination = (
  req: Request<unknown, unknown, unknown, {
    page?: string;
    size?: string;
  }>,
  res: Response<unknown, PaginationParams>,
  next: NextFunction
) => {
  handlerDebug('queryPagination');

  const { page, size } = req.query;

  if (!isEmpty(page) && isNaN(Number(page))) {
    res.status(400).json({ error: 'Query param "page" must be number' });
  } else if (!isEmpty(size) && isNaN(Number(size))) {
    res.status(400).json({ error: 'Query param "size" must be number' });
  } else {
    res.locals = {
      ...res.locals,
      page: isEmpty(page) ? 0 : Number(page),
      size: isEmpty(size) ? 10 : Number(size),
    };
    next();
  }
};

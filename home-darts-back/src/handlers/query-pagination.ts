import { NextFunction, Response } from 'express';
import { isProduction } from '../config/index.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';
import { isEmpty } from '../utils/functions/is-empty.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { PaginationParams } from '../utils/models/pagination-params.interface';

export const queryPagination = (
  req: RequestWithData<PaginationParams, unknown, unknown, unknown, {
    page?: string;
    size?: string;
  }>,
  res: Response,
  next: NextFunction
) => {
  if (!isProduction) console.info(formatDebugHandler('queryPagination'));

  const { page, size } = req.query;

  if (!isEmpty(page) && isNaN(Number(page))) {
    res.status(400).json({ error: 'Query param "page" must be number' });
  } else if (!isEmpty(size) && isNaN(Number(size))) {
    res.status(400).json({ error: 'Query param "size" must be number' });
  } else {
    req.data = {
      ...req.data,
      page: isEmpty(page) ? 0 : Number(page),
      size: isEmpty(size) ? 10 : Number(size),
    };
    next();
  }
};

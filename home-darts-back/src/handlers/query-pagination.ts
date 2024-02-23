import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';
import { LimitOffset } from '../utils/models/limit-offset.interface.js';

export const queryPagination = (
  req: Request,
  res: Response<unknown, LimitOffset>,
  next: NextFunction
) => {
  handlerDebug('queryPagination');

  const { page: pageQuery, size: sizeQuery } = req.query;

  if (!isEmpty(pageQuery) && isNaN(Number(pageQuery))) {
    res.status(400).json({ error: 'Query param "page" must be number' });
  } else if (!isEmpty(sizeQuery) && isNaN(Number(sizeQuery))) {
    res.status(400).json({ error: 'Query param "size" must be number' });
  } else {
    const page = isEmpty(pageQuery) ? 0 : Number(pageQuery);
    const size = isEmpty(sizeQuery) ? 10 : Number(sizeQuery);
    res.locals = {
      ...res.locals,
      limit: size,
      offset: page * size,
    };
    next();
  }
};

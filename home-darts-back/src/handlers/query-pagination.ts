import { isProduction } from '../config/index.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';
import { isEmpty } from '../utils/functions/is-empty.js';

/**
 * TODO: req typing
 * @param {import('express').Request} req
 * @param {import('express').Response<any, Record<string, any>, number>} res
 * @param {import('express').NextFunction} next
 */
export const queryPagination = (req, res, next) => {
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

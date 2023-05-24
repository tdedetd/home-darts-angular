import { isProduction } from '../config/index.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';
import { isEmpty } from '../utils/functions/is-empty.js';

/**
 * TODO: req typing
 * @param {import('express').Request} req
 * @param {import('express').Response<any, Record<string, any>, number>} res
 * @param {import('express').NextFunction} next
 */
export const paramGameId = (req, res, next) => {
  if (!isProduction) console.info(formatDebugHandler('paramGameId'));

  const gameId = req.params.gameId;
  if (isEmpty(gameId) || isNaN(Number(gameId))) {
    res.status(400).json({ error: 'Correct gameId is missing in params' });
  } else {
    req.data = { ...req.data, gameId: Number(gameId) };
    next();
  }
};

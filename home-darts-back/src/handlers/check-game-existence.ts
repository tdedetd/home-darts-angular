import { isProduction } from '../config/index.js';
import { getPgClient } from '../config/pg-connect.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';

/**
 * TODO: req typing
 * @param {import('express').Request} req
 * @param {import('express').Response<any, Record<string, any>, number>} res
 * @param {import('express').NextFunction} next
 */
export const checkGameExistence = async (req, res, next) => {
  if (!isProduction) console.info(formatDebugHandler('checkGameExistence'));

  const gameId = req.data.gameId;
  const existsResult = await getPgClient().query('SELECT EXISTS (SELECT FROM public.game WHERE id = $1)', [gameId]);
  if (existsResult.rows[0]['exists']) {
    next();
  } else {
    res.status(404).json({ error: `Game ${gameId} doesn't exists` });
  }
};

import { isProduction } from '../config/index.js';
import { getPgClient } from '../config/pg-connect.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';

/**
 * TODO: req typing
 * @param {import('express').Request} req
 * @param {import('express').Response<any, Record<string, any>, number>} res
 * @param {import('express').NextFunction} next
 */
export const completedGamesReadOnly = async (req, res, next) => {
  if (!isProduction) console.info(formatDebugHandler('completedGamesReadOnly'));

  const gameId = req.data.gameId;
  const isCompletedResult = await getPgClient().query('SELECT is_completed FROM public.game WHERE id = $1', [gameId]);
  if (isCompletedResult.rows.length && isCompletedResult.rows[0]['is_completed']) {
    res.status(403).json({ error: `Game ${gameId} is completed` });
  } else {
    next();
  }
};

import { NextFunction, Response } from 'express';
import { isProduction } from '../config/index.js';
import { getPgClient } from '../config/pg-connect.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';
import { RequestWithData } from '../utils/types/request-with-data.type';

export const completedGamesReadOnly = async (
  req: RequestWithData<{ gameId: number }, { gameId?: string }>,
  res: Response,
  next: NextFunction
) => {
  if (!isProduction) console.info(formatDebugHandler('completedGamesReadOnly'));

  if (!req.data) {
    res.status(500).json();
    return;
  }

  const gameId = req.data.gameId;
  const isCompletedResult = await getPgClient().query('SELECT is_completed FROM public.game WHERE id = $1', [gameId]);
  if (isCompletedResult.rows.length && isCompletedResult.rows[0]['is_completed']) {
    res.status(403).json({ error: `Game ${gameId} is completed` });
  } else {
    next();
  }
};

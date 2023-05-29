import { NextFunction, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const completedGamesReadOnly = async (
  req: RequestWithData<{ gameId: number }, { gameId?: string }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('completedGamesReadOnly');

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

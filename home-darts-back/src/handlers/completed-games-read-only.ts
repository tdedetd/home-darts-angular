import { NextFunction, Request, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const completedGamesReadOnly = async (
  req: Request,
  res: Response<unknown, { gameId: number }>,
  next: NextFunction
) => {
  handlerDebug('completedGamesReadOnly');

  const gameId = res.locals.gameId;
  const isCompletedResult = await getPgClient()
    .query<{ isCompleted: boolean }>('SELECT is_completed as "isCompleted" FROM public.game WHERE id = $1', [gameId]);

  if (isCompletedResult.rows.length && isCompletedResult.rows[0].isCompleted) {
    res.status(403).json({ error: `Game ${gameId} is completed` });
  } else {
    next();
  }
};

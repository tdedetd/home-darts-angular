import { NextFunction, Request, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const checkGameExistence = async (
  req: Request,
  res: Response<unknown, { gameId: number }>,
  next: NextFunction
) => {
  handlerDebug('checkGameExistence');

  const gameId = res.locals.gameId;
  const existsResult = await getPgClient()
    .query<{ exists: boolean }>('SELECT EXISTS (SELECT FROM public.game WHERE id = $1)', [gameId]);

  if (existsResult.rows[0].exists) {
    next();
  } else {
    res.status(404).json({ error: `Game ${gameId} doesn't exists` });
  }
};

import { NextFunction, Request, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const checkPlayerExistence = async (
  req: Request,
  res: Response<unknown, { playerId: number }>,
  next: NextFunction
) => {
  handlerDebug('checkPlayerExistence');

  const playerId = res.locals.playerId;
  const existsResult = await getPgClient()
    .query<{ exists: boolean }>('SELECT EXISTS (SELECT FROM public.player WHERE id = $1)', [playerId]);

  if (existsResult.rows[0].exists) {
    next();
  } else {
    res.status(404).json({ error: `Player ${playerId} doesn't exists` });
  }
};

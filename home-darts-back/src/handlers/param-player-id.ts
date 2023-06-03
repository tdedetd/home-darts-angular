import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const paramPlayerId = (
  req: Request<{ playerId?: string }>,
  res: Response<unknown, { playerId: number }>,
  next: NextFunction
) => {
  handlerDebug('paramPlayerId');

  const playerId = req.params.playerId;
  if (isEmpty(playerId) || isNaN(Number(playerId))) {
    res.status(400).json({ error: 'Correct playerId is missing in params' });
  } else {
    res.locals = { ...res.locals, playerId: Number(playerId) };
    next();
  }
};

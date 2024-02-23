import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const queryPlayerId = (
  req: Request,
  res: Response<unknown, { playerId: number }>,
  next: NextFunction
) => {
  handlerDebug('queryPlayerId');

  const playerId = req.query.playerId;
  if (isEmpty(playerId) || isNaN(Number(playerId))) {
    res.status(400).json({ error: 'Correct playerId is missing in query' });
  } else {
    res.locals = { ...res.locals, playerId: Number(playerId) };
    next();
  }
};

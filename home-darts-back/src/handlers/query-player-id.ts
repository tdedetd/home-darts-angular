import { NextFunction, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const queryPlayerId = (
  req: RequestWithData<{ playerId: number }, unknown, unknown, unknown, { playerId?: string }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('queryPlayerId');

  const playerId = req.query.playerId;
  if (isEmpty(playerId) || isNaN(Number(playerId))) {
    res.status(400).json({ error: 'Correct playerId is missing in query' });
  } else {
    req.data = { ...req.data, playerId: Number(playerId) };
    next();
  }
};

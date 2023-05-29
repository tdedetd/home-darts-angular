import { NextFunction, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const paramPlayerId = (
  req: RequestWithData<{ playerId: number }, { playerId?: string }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('paramPlayerId');

  const playerId = req.params.playerId;
  if (isEmpty(playerId) || isNaN(Number(playerId))) {
    res.status(400).json({ error: 'Correct playerId is missing in params' });
  } else {
    req.data = { ...req.data, playerId: Number(playerId) };
    next();
  }
};

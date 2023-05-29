import { NextFunction, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const paramGameId = (
  req: RequestWithData<{ gameId: number }, { gameId?: string }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('paramGameId');

  const gameId = req.params.gameId;
  if (isEmpty(gameId) || isNaN(Number(gameId))) {
    res.status(400).json({ error: 'Correct gameId is missing in params' });
  } else {
    req.data = { ...req.data, gameId: Number(gameId) };
    next();
  }
};

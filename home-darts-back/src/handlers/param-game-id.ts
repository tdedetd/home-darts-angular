import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const paramGameId = (
  req: Request,
  res: Response<unknown, { gameId: number }>,
  next: NextFunction
) => {
  handlerDebug('paramGameId');

  const gameId = req.params.gameId;
  if (isEmpty(gameId) || isNaN(Number(gameId))) {
    res.status(400).json({ error: 'Correct gameId is missing in params' });
  } else {
    res.locals = { ...res.locals, gameId: Number(gameId) };
    next();
  }
};

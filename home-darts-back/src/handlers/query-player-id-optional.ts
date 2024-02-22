import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const queryPlayerIdOptional = (
  req: Request<unknown, unknown, unknown, { playerId?: string }>,
  res: Response<unknown, { playerId?: number }>,
  next: NextFunction
) => {
  handlerDebug('queryPlayerIdOptional');

  const playerId = req.query.playerId;
  if (!isEmpty(playerId) && isNaN(Number(playerId))) {
    res.status(400).json({ error: 'playerId is not a number' });
  } else {
    res.locals = {
      ...res.locals,
      ...(isEmpty(playerId) ? {} : { playerId: Number(playerId) }),
    };
    next();
  }
};

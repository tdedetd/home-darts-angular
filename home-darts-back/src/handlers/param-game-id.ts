import { NextFunction, Response } from 'express';
import { isProduction } from '../config/index.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';
import { isEmpty } from '../utils/functions/is-empty.js';
import { RequestWithData } from '../utils/types/request-with-data.type';

export const paramGameId = (
  req: RequestWithData<{ gameId: number }, { gameId?: string }>,
  res: Response,
  next: NextFunction
) => {
  if (!isProduction) console.info(formatDebugHandler('paramGameId'));

  const gameId = req.params.gameId;
  if (isEmpty(gameId) || isNaN(Number(gameId))) {
    res.status(400).json({ error: 'Correct gameId is missing in params' });
  } else {
    req.data = { ...req.data, gameId: Number(gameId) };
    next();
  }
};

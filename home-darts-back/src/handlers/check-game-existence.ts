import { NextFunction, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const checkGameExistence = async (
  req: RequestWithData<{ gameId: number }, { gameId?: string }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('checkGameExistence');

  if (!req.data) {
    res.status(500).json();
    return;
  }

  const gameId = req.data.gameId;
  const existsResult = await getPgClient().query('SELECT EXISTS (SELECT FROM public.game WHERE id = $1)', [gameId]);
  if (existsResult.rows[0]['exists']) {
    next();
  } else {
    res.status(404).json({ error: `Game ${gameId} doesn't exists` });
  }
};

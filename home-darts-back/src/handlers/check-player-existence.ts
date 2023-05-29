import { NextFunction, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const checkPlayerExistence = async (
  req: RequestWithData<{ playerId: number }, { playerId?: string }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('checkPlayerExistence');

  if (!req.data) {
    res.status(500).json();
    return;
  }

  const playerId = req.data.playerId;
  const existsResult = await getPgClient().query('SELECT EXISTS (SELECT FROM public.player WHERE id = $1)', [playerId]);
  if (existsResult.rows[0]['exists']) {
    next();
  } else {
    res.status(404).json({ error: `Player ${playerId} doesn't exists` });
  }
};

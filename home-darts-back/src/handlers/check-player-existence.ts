import { NextFunction, Response } from 'express';
import { isProduction } from '../config/index.js';
import { getPgClient } from '../config/pg-connect.js';
import { formatDebugHandler } from '../utils/functions/format-debug-handler.js';
import { RequestWithData } from '../utils/types/request-with-data.type';

/**
 * TODO: req typing
 * @param {import('express').Request} req
 * @param {import('express').Response<any, Record<string, any>, number>} res
 * @param {import('express').NextFunction} next
 */
export const checkPlayerExistence = async (
  req: RequestWithData<{ playerId: number }, { playerId?: string }>,
  res: Response,
  next: NextFunction
) => {
  if (!isProduction) console.info(formatDebugHandler('checkPlayerExistence'));

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

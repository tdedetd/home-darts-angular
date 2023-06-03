import { NextFunction, Request, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const playerParticipation = async (
  req: Request,
  res: Response<unknown, { gameId: number, playerId: number }>,
  next: NextFunction
) => {
  handlerDebug('playerParticipation');

  const { gameId, playerId } = res.locals;
  const existsResult = await getPgClient().query<{ exists: boolean }>(
    'SELECT EXISTS (SELECT gp.id FROM public.game_player gp WHERE gp.player_id = $1 and gp.game_id = $2)',
    [playerId, gameId]
  );
  const isParticipant = existsResult.rows[0].exists;
  if (isParticipant) {
    next();
  } else {
    res.status(403).json({ error: `Player ${playerId} is not participant of game ${gameId}` });
  }
};

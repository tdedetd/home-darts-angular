import { NextFunction, Response } from 'express';
import { getPgClient } from '../config/pg-connect.js';
import { RequestWithData } from '../utils/types/request-with-data.type';
import { handlerDebug } from '../utils/functions/handler-debug.js';

export const playerParticipation = async (
  req: RequestWithData<{ gameId: number, playerId: number }>,
  res: Response,
  next: NextFunction
) => {
  handlerDebug('playerParticipation');

  if (!req.data) {
    res.status(500).json();
    return;
  }

  const { gameId, playerId } = req.data;
  const existsResult = await getPgClient().query(
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

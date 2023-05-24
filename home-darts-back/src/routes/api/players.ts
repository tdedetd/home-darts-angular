import { Router } from 'express';
import { maxThrowTimeSeconds } from '../../config/index.js';
import { getPgClient } from '../../config/pg-connect.js';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { paramPlayerId } from '../../handlers/param-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { RequestWithData } from '../../utils/types/request-with-data.type.js';

export const playersRouter = Router();

playersRouter.get('/', async (req, res) => {
  const playersResult = await getPgClient().query(getSql('players'));
  res.json(playersResult.rows);
});

playersRouter.get('/:playerId([0-9]+)/stats', paramPlayerId, checkPlayerExistence, async (req: RequestWithData, res) => {
  const playerId = req.data.playerId;
  const gamesCountResult = await getPgClient().query(getSql('games-count'), [playerId]);
  const throwsCountResult = await getPgClient().query('SELECT count(t.id)::int as "throwsCount" FROM public.throw t WHERE t.player_id = $1', [playerId]);
  const totalPlayingTimeResult = await getPgClient().query(getSql('total-playing-time'), [playerId, maxThrowTimeSeconds]);

  res.json({
    ...gamesCountResult.rows[0],
    ...throwsCountResult.rows[0],
    ...totalPlayingTimeResult.rows[0],
  });
});

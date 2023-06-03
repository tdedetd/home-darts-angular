import { Request, Response, Router } from 'express';
import { maxThrowTimeSeconds } from '../../config/index.js';
import { getPgClient } from '../../config/pg-connect.js';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { paramPlayerId } from '../../handlers/param-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { SqlQueries } from '../../utils/types/sql-queries.enum.js';
import { Player } from '../../utils/models/player.interface.js';
import { PlayerStats } from '../../utils/models/player-stats.interface.js';

export const playersRouter = Router();

playersRouter.get('/', async (req: Request, res: Response<Player[], { playerId: number }>) => {
  const playersResult = await getPgClient().query<Player>(getSql(SqlQueries.Players));
  res.json(playersResult.rows);
});

playersRouter.get('/:playerId([0-9]+)/stats', paramPlayerId, checkPlayerExistence, async (
  req: Request,
  res: Response<PlayerStats, { playerId: number }>,
) => {
  const playerId = res.locals.playerId;
  const gamesCountResult = await getPgClient()
    .query<{ gamesCount: number }>(getSql(SqlQueries.GamesCount), [playerId]);

  const throwsCountResult = await getPgClient()
    .query<{ throwsCount: number }>('SELECT count(t.id)::int as "throwsCount" FROM public.throw t WHERE t.player_id = $1', [playerId]);

  const totalPlayingTimeResult = await getPgClient()
    .query<{ totalPlayingTimeSeconds: number }>(getSql(SqlQueries.TotalPlayingTime), [playerId, maxThrowTimeSeconds]);

  res.json({
    ...gamesCountResult.rows[0],
    ...throwsCountResult.rows[0],
    ...totalPlayingTimeResult.rows[0],
  });
});

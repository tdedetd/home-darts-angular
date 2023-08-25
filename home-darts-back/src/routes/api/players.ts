import { Request, Response, Router } from 'express';
import { maxThrowTimeSeconds } from '../../config/index.js';
import { getPgClient } from '../../config/pg-connect.js';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { paramPlayerId } from '../../handlers/param-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { SqlQueries } from '../../utils/types/sql-queries.enum.js';
import { Player } from '../../utils/models/player.interface.js';
import { PlayerStats } from '../../utils/models/player-stats.interface.js';
import { ThrowsHits } from '../../utils/models/throws-hits.interface.js';
import { SectionTypes } from '../../utils/types/section-types.enum.js';

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

  const atcGamesCountBySectionTypesResult = await getPgClient()
    .query<{ sectionType: SectionTypes, gamesCount: number }>(getSql(SqlQueries.AtcGamesCountBySectionType), [playerId]);

  const atcThrowsHitsResult = await getPgClient().query<ThrowsHits>(getSql(SqlQueries.AtcThrowsHits), [playerId]);
  const atcThrowsHitsBySectionTypesResult = await getPgClient()
    .query<{ sectionType: SectionTypes } & ThrowsHits>(getSql(SqlQueries.AtcThrowsHitsBySectionTypes), [playerId]);

  const longestHitsStreakResult = await getPgClient()
    .query<{ longestHitsStreak: number }>('SELECT public.get_longest_hits_streak($1) as "longestHitsStreak"', [playerId]);
  const atcLongestHitsStreakBySectionTypesResult = await getPgClient()
    .query<{ sectionType: SectionTypes, longestHitsStreak: number }>(getSql(SqlQueries.LongestHitsStreakBySectionTypes), [playerId]);

  res.json({
    ...gamesCountResult.rows[0],
    ...throwsCountResult.rows[0],
    ...totalPlayingTimeResult.rows[0],
    aroundTheClock: {
      ...atcThrowsHitsResult.rows[0],
      ...longestHitsStreakResult.rows[0],
      gamesCount: atcGamesCountBySectionTypesResult.rows,
      throwsHits: atcThrowsHitsBySectionTypesResult.rows,
      hitsStreak: atcLongestHitsStreakBySectionTypesResult.rows,
    }
  });
});

import { Request, Response, Router } from 'express';
import { getPgClient } from '../../../config/pg-connect.js';
import { checkGameExistence } from '../../../handlers/check-game-existence.js';
import { checkPlayerExistence } from '../../../handlers/check-player-existence.js';
import { completedGamesReadOnly } from '../../../handlers/completed-games-read-only.js';
import { paramGameId } from '../../../handlers/param-game-id.js';
import { playerParticipation } from '../../../handlers/player-participation.js';
import { queryPlayerId } from '../../../handlers/query-player-id.js';
import { GameParamTypes } from '../../../utils/types/game-param-types.enum.js';
import { Gamemodes } from '../../../utils/types/gamemodes.enum.js';
import { getSql } from '../../../utils/functions/get-sql.js';
import { getUtcDate } from '../../../utils/functions/get-utc-date.js';
import { isEmpty } from '../../../utils/functions/is-empty.js';
import { SqlQueries } from '../../../utils/types/sql-queries.enum.js';
import { AroundTheClockStartParams } from '../../../utils/models/around-the-clock-start-params.interface.js';
import { Throw } from '../../../utils/models/throw.interface.js';
import { Player } from '../../../utils/models/player.interface.js';
import { AtcHitRate } from '../../../utils/models/atc-hit-rate.type.js';
import { SectionTypes } from '../../../utils/types/section-types.enum.js';
import { GameDirections } from '../../../utils/types/game-directions.enum.js';
import { queryHitDetection } from '../../../handlers/query-hit-detection.js';

export const aroundTheClockRouter = Router();

aroundTheClockRouter.use('/:gameId([0-9]+)', paramGameId, checkGameExistence, completedGamesReadOnly);

aroundTheClockRouter.get('/hit-rate', queryPlayerId, checkPlayerExistence, queryHitDetection, async (
  req: Request<unknown, unknown, unknown, {
    playerId?: string,
    hitDetection?: string,
    direction?: GameDirections,
    fastGame?: string,
    includeBull?: string,
    isCompleted?: string,
  }>,
  res: Response<AtcHitRate[], { playerId: number, hitDetection: SectionTypes }>
) => {
  const { playerId } = res.locals;
  const { hitDetection, direction, fastGame, includeBull, isCompleted } = req.query;
  const result = await getPgClient().query<AtcHitRate>(getSql(SqlQueries.AtcHitRate), [
    playerId,
    hitDetection,
    direction ?? null,
    fastGame ?? null,
    includeBull ?? null,
    isEmpty(isCompleted) ? null : isCompleted === 'true',
  ]);
  res.json(result.rows);
})

// TODO: +checkPlayersInBodySpecified, +checkBodyPlayersExistence
aroundTheClockRouter.post('/start', async (
  req: Request<unknown, unknown, AroundTheClockStartParams & { players: Player['id'][] }>,
  res: Response<{ gameId: number }>
) => {
  await getPgClient().query('BEGIN');
  const insertGameResult = await getPgClient().query<{ id: number }>(
    'INSERT INTO public.game (creation_date, gamemode_name) VALUES ($1, $2) RETURNING id',
    [getUtcDate(), Gamemodes.AroundTheClock]
  );

  const gameId = insertGameResult.rows[0].id;
  req.body.players.forEach(async (playerId) => {
    // TODO: via bulk insert
    await getPgClient().query('INSERT INTO public.game_player (game_id, player_id) VALUES ($1, $2)', [gameId, playerId]);
  });

  // TODO: via bulk insert
  const insertGameParamsQuery = 'INSERT INTO public.game_param (game_id, param_name, value) VALUES ($1, $2, $3)';
  await getPgClient().query(insertGameParamsQuery, [gameId, GameParamTypes.Direction, req.body.direction]);
  await getPgClient().query(insertGameParamsQuery, [gameId, GameParamTypes.HitDetection, req.body.hitDetection]);
  await getPgClient().query(insertGameParamsQuery, [gameId, GameParamTypes.FastGame, req.body.fastGame]);
  await getPgClient().query(insertGameParamsQuery, [gameId, GameParamTypes.IncludeBull, req.body.includeBull]);

  await getPgClient().query('COMMIT');
  res.status(201).json({ gameId });
});

aroundTheClockRouter.post('/:gameId([0-9]+)/throw', queryPlayerId, checkPlayerExistence, playerParticipation, async (
  req: Request<unknown, unknown, { nominal: number, hit: boolean, multiplier?: number }>,
  res: Response<void, { playerId: number, gameId: number }>
) => {
  const playerId = res.locals.playerId;
  const gameId = res.locals.gameId;

  if (isEmpty(req.body.nominal) || isNaN(Number(req.body.nominal)) || isEmpty(req.body.hit)) {
    res.status(400).json();
    return;
  }

  const { hit, nominal, multiplier } = req.body;

  await getPgClient().query('BEGIN');
  await getPgClient().query(
    'INSERT INTO public.throw (creation_date, game_id, player_id, hit, nominal, multiplier) VALUES ($1, $2, $3, $4, $5, $6)',
    [getUtcDate(), gameId, playerId, hit, nominal, multiplier ?? 1]
  );
  await getPgClient().query('COMMIT');
  res.status(201).json();
});

aroundTheClockRouter.delete('/:gameId([0-9]+)/undo', async (
  req: Request,
  res: Response<Throw, { gameId: number }>
) => {
  const gameId = res.locals.gameId;

  const lastThrowResult = await getPgClient()
    .query<{ id: number }>('SELECT t.id FROM public.throw t WHERE game_id = $1 ORDER BY t.creation_date desc limit 1', [gameId]);
  if (!lastThrowResult.rows.length) {
    res.json();
    return;
  }
  const lastThrowId = lastThrowResult.rows[0].id;

  const deletedThrowResult = await getPgClient().query<Throw>(getSql(SqlQueries.DeleteFromThrow), [lastThrowId]);
  await getPgClient().query('COMMIT');
  res.json(deletedThrowResult.rows[0]);
});

aroundTheClockRouter.put('/:gameId([0-9]+)/complete', async (
  req: Request,
  res: Response<void, { gameId: number }>
) => {
  const gameId = res.locals.gameId;
  await getPgClient().query('BEGIN');
  await getPgClient().query('UPDATE public.game SET is_completed = true WHERE id = $1', [gameId]);
  await getPgClient().query('COMMIT');
  res.json();
});

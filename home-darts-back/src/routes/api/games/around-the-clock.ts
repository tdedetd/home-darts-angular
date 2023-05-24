import { Router } from 'express';
import { getPgClient } from '../../../config/pg-connect.js';
import { checkGameExistence } from '../../../handlers/check-game-existence.js';
import { checkPlayerExistence } from '../../../handlers/check-player-existence.js';
import { completedGamesReadOnly } from '../../../handlers/completed-games-read-only.js';
import { paramGameId } from '../../../handlers/param-game-id.js';
import { playerParticipation } from '../../../handlers/player-participation.js';
import { queryPlayerId } from '../../../handlers/query-player-id.js';
import { GAME_DIRECTION_FORWARD_BACKWARD } from '../../../utils/constants/game-directions.js';
import { GAME_PARAM_BOOLEAN_FALSE, GAME_PARAM_BOOLEAN_TRUE } from '../../../utils/constants/game-param-booleans.js';
import { GAME_PARAM_TYPE_DIRECTION, GAME_PARAM_TYPE_FAST_GAME, GAME_PARAM_TYPE_HIT_DETECTION, GAME_PARAM_TYPE_INCLUDE_BULL } from '../../../utils/constants/game-param-types.js';
import { GAMEMODE_AROUND_THE_CLOCK } from '../../../utils/constants/gamemodes.js';
import { SECTION_TYPE_ANY } from '../../../utils/constants/section-types.js';
import { getSql } from '../../../utils/functions/get-sql.js';
import { getUtcDate } from '../../../utils/functions/get-utc-date.js';
import { isEmpty } from '../../../utils/functions/is-empty.js';
import { RequestWithData } from '../../../utils/types/request-with-data.type.js';

export const aroundTheClockRouter = Router();

aroundTheClockRouter.use(queryPlayerId, checkPlayerExistence);
aroundTheClockRouter.use('/:gameId([0-9]+)', paramGameId, checkGameExistence, completedGamesReadOnly, playerParticipation);

aroundTheClockRouter.post('/start', async (req: RequestWithData, res) => {
  // TODO: type check
  const playerId = req.data.playerId;
  await getPgClient().query('BEGIN');
  const insertGameResult = await getPgClient().query(
    'INSERT INTO public.game (creation_date, gamemode_name) VALUES ($1, $2) RETURNING id',
    [getUtcDate(), GAMEMODE_AROUND_THE_CLOCK]
  );

  const gameId = insertGameResult.rows[0].id;
  await getPgClient().query('INSERT INTO public.game_player (game_id, player_id) VALUES ($1, $2)', [gameId, playerId]);

  // TODO: via bulk insert
  const insertGameParamsQuery = 'INSERT INTO public.game_param (game_id, param_name, value) VALUES ($1, $2, $3)';
  await getPgClient().query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_DIRECTION, GAME_DIRECTION_FORWARD_BACKWARD]);
  await getPgClient().query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_HIT_DETECTION, SECTION_TYPE_ANY]);
  await getPgClient().query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_FAST_GAME, GAME_PARAM_BOOLEAN_FALSE]);
  await getPgClient().query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_INCLUDE_BULL, GAME_PARAM_BOOLEAN_TRUE]);

  await getPgClient().query('COMMIT');
  res.status(201).json({ gameId });
});

aroundTheClockRouter.post('/:gameId([0-9]+)/throw', async (req: RequestWithData, res) => {
  // TODO: type check
  const playerId = req.data.playerId;
  // TODO: type check
  const gameId = req.data.gameId;

  if (isEmpty(req.body.nominal) || isNaN(Number(req.body.nominal)) || isEmpty(req.body.hit)) {
    res.status(400).json();
    return;
  }

  /** @type {number} */
  const nominal = req.body.nominal;
  /** @type {boolean} */
  const hit = Boolean(req.body.hit);

  await getPgClient().query('BEGIN');
  await getPgClient().query(
    'INSERT INTO public.throw (creation_date, game_id, player_id, hit, nominal, multiplier) VALUES ($1, $2, $3, $4, $5, $6)',
    [getUtcDate(), gameId, playerId, hit, nominal, 1]
  );
  await getPgClient().query('COMMIT');
  res.status(201).json();
});

aroundTheClockRouter.delete('/:gameId([0-9]+)/undo', async (req: RequestWithData, res) => {
  // TODO: type check
  const gameId = req.data.gameId;

  const lastThrowResult = await getPgClient().query('SELECT t.id FROM public.throw t WHERE game_id = $1 ORDER BY t.id desc limit 1', [gameId]);
  if (!lastThrowResult.rows.length) {
    res.json();
    return;
  }
  const lastThrowId = lastThrowResult.rows[0].id;

  const deletedThrowResult = await getPgClient().query(getSql('delete-from-throw'), [lastThrowId]);
  await getPgClient().query('COMMIT');
  res.json(deletedThrowResult.rows[0]);
});

aroundTheClockRouter.put('/:gameId([0-9]+)/complete', async (req: RequestWithData, res) => {
  // TODO: type check
  const gameId = req.data.gameId;
  await getPgClient().query('BEGIN');
  await getPgClient().query('UPDATE public.game SET is_completed = true WHERE id = $1', [gameId]);
  await getPgClient().query('COMMIT');
  res.json();
});

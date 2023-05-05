const router = require('express').Router();
const { getPgClient } = require('../../config/pg');
const { checkGameExistanse } = require('../../middleware/check-game-existanse');
const { completedGamesReadOnly } = require('../../middleware/completed-games-read-only');
const { paramGameId } = require('../../middleware/param-game-id');
const { queryPlayerId } = require('../../middleware/query-player-id');
const { GAME_DIRECTION_FORWARD_BACKWARD } = require('../../utils/constants/game-directions');
const { GAME_PARAM_BOOLEAN_TRUE, GAME_PARAM_BOOLEAN_FALSE } = require('../../utils/constants/game-param-booleans');
const {
  GAME_PARAM_TYPE_DIRECTION,
  GAME_PARAM_TYPE_HIT_DETECTION,
  GAME_PARAM_TYPE_FAST_GAME,
  GAME_PARAM_TYPE_INCLUDE_BULL
} = require('../../utils/constants/game-param-types');
const { GAMEMODE_AROUND_THE_CLOCK } = require('../../utils/constants/gamemodes');
const { SECTION_TYPE_ANY } = require('../../utils/constants/section-types');
const { getUtcDate } = require('../../utils/functions/get-utc-date');
const { isEmpty } = require('../../utils/functions/is-empty');

// TODO: around-the-clock section

router.use('/', queryPlayerId);
router.use('/:gameId([0-9]+)', paramGameId, checkGameExistanse, completedGamesReadOnly);

router.post('/start', async (req, res) => {
  const playerId = req.query.playerId;
  await getPgClient().query('BEGIN');
  const insertGameResult = await getPgClient().query(
    'INSERT INTO public.game (creation_date, gamemode_name) VALUES ($1, $2) RETURNING id',
    [getUtcDate(), GAMEMODE_AROUND_THE_CLOCK]
  );

  /** @type {number} */
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

// TODO: check player participation
router.post('/:gameId([0-9]+)/throw', async (req, res) => {
  const playerId = req.query.playerId;
  const gameId = req.params.gameId;

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

// TODO: check player participation
router.delete('/:gameId([0-9]+)/undo', async (req, res) => {
  const playerId = req.query.playerId;
  const gameId = req.params.gameId;

  const lastThrowResult = await getPgClient().query(
    'SELECT t.id FROM public.throw t WHERE game_id = $1 and player_id = $2 ORDER BY t.id desc limit 1',
    [gameId, playerId]
  );
  if (!lastThrowResult.rows.length) {
    res.json();
    return;
  }
  const lastThrowId = lastThrowResult.rows[0].id;

  await getPgClient().query('DELETE FROM public.throw WHERE id = $1', [lastThrowId]);
  await getPgClient().query('COMMIT');
  res.json();
});

router.put('/:gameId([0-9]+)/complete', async (req, res) => {
  const playerId = req.query.playerId;
  const gameId = req.params.gameId;

  await getPgClient().query('BEGIN');

  // TODO: out check player participation into middleware
  // TODO: EXISTS
  const gamePlayerResult = await getPgClient().query('SELECT FROM public.game_player WHERE game_id = $1 and player_id = $2', [gameId, playerId]);
  const isParticipant = gamePlayerResult.rows.length === 1;

  if (!isParticipant) {
    res.status(403).json();
    return;
  }

  await getPgClient().query('UPDATE public.game SET is_completed = true WHERE id = $1', [gameId]);
  await getPgClient().query('COMMIT');
  res.json();
});

module.exports = router;

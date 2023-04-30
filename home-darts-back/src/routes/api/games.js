const router = require('express').Router();
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

const { Pool: PgPool } = require('pg');
const pgPool = new PgPool(require('../../config').pg);

router.post('/start', queryPlayerId, (req, res) => {
  const playerId = req.query.playerId;
  pgPool.connect().then(async (client) => {
    await client.query('BEGIN');
    const insertGameResult = await client.query(
      'INSERT INTO public.game (creation_date, gamemode_name) VALUES ($1, $2) RETURNING id',
      [getUtcDate(), GAMEMODE_AROUND_THE_CLOCK]
    );

    /** @type {number} */
    const gameId = insertGameResult.rows[0].id;
    await client.query('INSERT INTO public.game_player (game_id, player_id) VALUES ($1, $2)', [gameId, playerId]);

    // TODO: via bulk insert
    const insertGameParamsQuery = 'INSERT INTO public.game_param (game_id, param_name, value) VALUES ($1, $2, $3)';
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_DIRECTION, GAME_DIRECTION_FORWARD_BACKWARD]);
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_HIT_DETECTION, SECTION_TYPE_ANY]);
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_FAST_GAME, GAME_PARAM_BOOLEAN_FALSE]);
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_INCLUDE_BULL, GAME_PARAM_BOOLEAN_TRUE]);

    await client.query('COMMIT');
    res.status(201);
    res.json({ gameId });
  }).catch(err => {
    // TODO: log error
    res.status(500);
    res.json();
  });
});

router.post('/:gameId/throw', queryPlayerId, paramGameId, completedGamesReadOnly, (req, res) => {
  const playerId = req.query.playerId;
  const gameId = req.params.gameId;

  /** @type {number} */
  const nominal = req.body.nominal;
  /** @type {boolean} */
  const hit = req.body.hit;

  pgPool.connect().then(async (client) => {
    await client.query('BEGIN');
    await client.query(
      'INSERT INTO public.throw (creation_date, game_id, player_id, hit, nominal, multiplier) VALUES ($1, $2, $3, $4, $5, $6)',
      [getUtcDate(), gameId, playerId, hit, nominal, 1]
    );
    await client.query('COMMIT');
    res.status(201);
    res.json();
  }).catch(err => {
    // TODO: log error
    res.status(500);
    res.json();
  });
});

router.delete('/:gameId/undo', queryPlayerId, paramGameId, completedGamesReadOnly, (req, res) => {
  const playerId = req.query.playerId;
  const gameId = req.params.gameId;

  pgPool.connect().then(async (client) => {
    const lastThrowResult = await client.query(
      'SELECT t.id FROM public.throw t WHERE game_id = $1 and player_id = $2 ORDER BY t.id desc limit 1',
      [gameId, playerId]
    );
    if (!lastThrowResult.rows.length) {
      res.json();
      return;
    }
    const lastThrowId = lastThrowResult.rows[0].id;

    await client.query('DELETE FROM public.throw WHERE id = $1', [lastThrowId]);
    await client.query('COMMIT');
    res.json();
  }).catch(err => {
    // TODO: log error
    res.status(500);
    res.json();
  });
});

module.exports = router;

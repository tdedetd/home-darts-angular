const router = require('express').Router();
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

const { Pool: PgPool } = require('pg');
const pgPool = new PgPool(require('../../config').pg);

router.use((req, res, next) => {
  // TODO: check player existence
  const playerId = req.query.playerId;
  if (isEmpty(playerId) || isNaN(Number(playerId))) {
    res.status(400);
    res.json();
  } else {
    req.query.playerId = Number(playerId);
    next();
  }
});

router.post('/start', (req, res) => {
  const playerId = req.query.playerId;
  pgPool.connect().then(async (client) => {
    await client.query('BEGIN');
    const insertGameResult = await client.query(
      'INSERT INTO public.game (creation_date, gamemode_name) VALUES ($1, $2) RETURNING id',
      [getUtcDate(), GAMEMODE_AROUND_THE_CLOCK]
    );
    const gameId = insertGameResult.rows[0].id;
    await client.query('INSERT INTO public.game_player (game_id, player_id) VALUES ($1, $2)', [gameId, playerId]);

    // TODO: via bulk insert
    const insertGameParamsQuery = 'INSERT INTO public.game_param (game_id, param_name, value) VALUES ($1, $2, $3)';
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_DIRECTION, GAME_DIRECTION_FORWARD_BACKWARD]);
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_HIT_DETECTION, SECTION_TYPE_ANY]);
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_FAST_GAME, GAME_PARAM_BOOLEAN_FALSE]);
    await client.query(insertGameParamsQuery, [gameId, GAME_PARAM_TYPE_INCLUDE_BULL, GAME_PARAM_BOOLEAN_TRUE]);

    await client.query('COMMIT');
    res.json({ gameId });
  }).catch(err => {
    // TODO: log error
    res.status(500);
    res.json();
  });
});

module.exports = router;

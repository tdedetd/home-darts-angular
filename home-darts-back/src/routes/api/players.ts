const { maxThrowTimeSeconds } = require('../../config');
const { getPgClient } = require('../../config/pg');
const { checkPlayerExistence } = require('../../handlers/check-player-existence');
const { paramPlayerId } = require('../../handlers/param-player-id');
const { getSql } = require('../../utils/functions/get-sql');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const playersResult = await getPgClient().query(getSql('players'));
  res.json(playersResult.rows);
});

router.get('/:playerId([0-9]+)/stats', paramPlayerId, checkPlayerExistence, async (req, res) => {
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

module.exports = router;

export {};

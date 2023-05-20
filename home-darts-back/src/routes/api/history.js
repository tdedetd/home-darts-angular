const router = require('express').Router();
const { getPgClient } = require('../../config/pg');
const { checkPlayerExistence } = require('../../handlers/check-player-existence');
const { queryPagination } = require('../../handlers/query-pagination');
const { queryPlayerId } = require('../../handlers/query-player-id');
const { getSql } = require('../../utils/functions/get-sql');

router.use(queryPlayerId, checkPlayerExistence);

router.get('/', queryPagination, async (req, res) => {
  const { page, size } = req.data;
  const historyRes = await getPgClient().query(
    getSql('history'),
    [req.data.playerId, size, page * size]
  );
  res.json(historyRes.rows);
});

module.exports = router;

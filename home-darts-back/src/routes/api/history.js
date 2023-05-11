const router = require('express').Router();
const { getPgClient } = require('../../config/pg');
const { queryPagination } = require('../../middleware/query-pagination');
const { queryPlayerId } = require('../../middleware/query-player-id');
const { getSql } = require('../../utils/functions/get-sql');

router.use(queryPlayerId);

router.get('/', queryPagination, async (req, res) => {
  const { page, size } = req.data;
  const historyRes = await getPgClient().query(
    getSql('history'),
    [req.query.playerId, size, page * size]
  );
  res.json(historyRes.rows);
});

module.exports = router;

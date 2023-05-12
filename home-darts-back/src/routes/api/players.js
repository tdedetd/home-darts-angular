const { getPgClient } = require('../../config/pg');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const playersResult = await getPgClient().query('SELECT p.id, p.creation_date as "creationDate", p.username FROM public.player p ORDER BY p.username');
  res.json(playersResult.rows);
});

module.exports = router;

const router = require('express').Router();

router.use('/games', require('./games'));
router.use('/history', require('./history'));

module.exports = router;

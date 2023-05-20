const router = require('express').Router();

router.use('/games', require('./games'));
router.use('/history', require('./history'));
router.use('/players', require('./players'));

module.exports = router;

export {};

const router = require('express').Router();
const nocache = require('nocache');

router.use(nocache());
router.use('/api', require('./api'));

module.exports = router;

export {};

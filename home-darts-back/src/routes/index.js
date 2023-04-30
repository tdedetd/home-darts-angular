const router = require('express').Router();

// TODO: auth middleware
router.use('/api', require('./api'));

module.exports = router;

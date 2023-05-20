const { isProduction } = require('../config');
const { formatDebugHandler } = require('../utils/functions/format-debug-handler');
const { isEmpty } = require('../utils/functions/is-empty');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req
   * @param {import('express').Response<any, Record<string, any>, number>} res
   * @param {import('express').NextFunction} next
   */
  paramPlayerId: (req, res, next) => {
    if (!isProduction) console.info(formatDebugHandler('paramPlayerId'));

    const playerId = req.params.playerId;
    if (isEmpty(playerId) || isNaN(Number(playerId))) {
      res.status(400).json({ error: 'Correct playerId is missing in params' });
    } else {
      req.data = { ...req.data, playerId: Number(playerId) };
      next();
    }
  }
};

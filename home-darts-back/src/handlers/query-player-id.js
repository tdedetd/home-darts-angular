// TODO: replace by auth
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
  queryPlayerId: (req, res, next) => {
    if (!isProduction) console.info(formatDebugHandler('queryPlayerId'));

    const playerId = req.query.playerId;
    if (isEmpty(playerId) || isNaN(Number(playerId))) {
      res.status(400).json({ error: 'Correct playerId is missing in query' });
    } else {
      req.query.playerId = Number(playerId);
      next();
    }
    // TODO: check player existence
  }
};

const { isProduction } = require('../config');
const { formatDebugMiddleware } = require('../utils/functions/format-debug-middleware');
const { isEmpty } = require('../utils/functions/is-empty');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req
   * @param {import('express').Response<any, Record<string, any>, number>} res
   * @param {import('express').NextFunction} next
   */
  paramGameId: (req, res, next) => {
    if (!isProduction) console.info(formatDebugMiddleware('paramGameId'));

    const gameId = req.params.gameId;
    if (isEmpty(gameId) || isNaN(Number(gameId))) {
      res.status(400).json();
    } else {
      req.params.gameId = Number(gameId);
      next();
    }
  }
};

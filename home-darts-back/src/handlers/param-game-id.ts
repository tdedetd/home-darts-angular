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
  paramGameId: (req, res, next) => {
    if (!isProduction) console.info(formatDebugHandler('paramGameId'));

    const gameId = req.params.gameId;
    if (isEmpty(gameId) || isNaN(Number(gameId))) {
      res.status(400).json({ error: 'Correct gameId is missing in params' });
    } else {
      req.data = { ...req.data, gameId: Number(gameId) };
      next();
    }
  }
};

export {};

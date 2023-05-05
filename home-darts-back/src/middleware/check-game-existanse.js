const { isProduction } = require('../config');
const { getPgClient } = require('../config/pg');
const { formatDebugMiddleware } = require('../utils/functions/format-debug-middleware');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req
   * @param {import('express').Response<any, Record<string, any>, number>} res
   * @param {import('express').NextFunction} next
   */
  checkGameExistanse: async (req, res, next) => {
    if (!isProduction) console.info(formatDebugMiddleware('checkGameExistanse'));

    const gameId = req.params.gameId;
    const existsResult = await getPgClient().query('SELECT EXISTS (SELECT FROM public.game WHERE id = $1)', [gameId]);
    if (existsResult.rows[0]['exists']) {
      next();
    } else {
      res.status(404).json();
    }
  }
};

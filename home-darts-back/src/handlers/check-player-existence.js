const { isProduction } = require('../config');
const { getPgClient } = require('../config/pg');
const { formatDebugHandler } = require('../utils/functions/format-debug-handler');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req
   * @param {import('express').Response<any, Record<string, any>, number>} res
   * @param {import('express').NextFunction} next
   */
  checkPlayerExistence: async (req, res, next) => {
    if (!isProduction) console.info(formatDebugHandler('checkPlayerExistence'));

    const playerId = req.data.playerId;
    const existsResult = await getPgClient().query('SELECT EXISTS (SELECT FROM public.player WHERE id = $1)', [playerId]);
    if (existsResult.rows[0]['exists']) {
      next();
    } else {
      res.status(404).json({ error: `Player ${playerId} doesn't exists` });
    }
  }
};

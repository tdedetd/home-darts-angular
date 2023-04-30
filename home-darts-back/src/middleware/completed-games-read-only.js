const { getPgClient } = require('../config/pg');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req 
   * @param {import('express').Response<any, Record<string, any>, number>} res 
   * @param {import('express').NextFunction} next 
   */
  completedGamesReadOnly: async (req, res, next) => {
    const gameId = req.params.gameId;

    const isCompletedResult = await getPgClient().query('SELECT is_completed FROM public.game WHERE id = $1', [gameId]);
    if (isCompletedResult.rows.length && isCompletedResult.rows[0]['is_completed']) {
      res.status(403);
      res.json();
      return;
    } else {
      next();
    }
  }
};

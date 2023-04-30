const { isEmpty } = require('../utils/functions/is-empty');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req
   * @param {import('express').Response<any, Record<string, any>, number>} res
   * @param {import('express').NextFunction} next
   */
  queryPlayerId: (req, res, next) => {
    // TODO: check player existence
    const playerId = req.query.playerId;
    if (isEmpty(playerId) || isNaN(Number(playerId))) {
      res.status(400);
      res.json();
    } else {
      req.query.playerId = Number(playerId);
      next();
    }
  }
};

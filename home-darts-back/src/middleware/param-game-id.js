const { isEmpty } = require('../utils/functions/is-empty');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req 
   * @param {import('express').Response<any, Record<string, any>, number>} res 
   * @param {import('express').NextFunction} next 
   */
  paramGameId: (req, res, next) => {
    // TODO: check game existence
    const gameId = req.params.gameId;
    if (isEmpty(gameId) || isNaN(Number(gameId))) {
      res.status(400);
      res.json();
    } else {
      req.params.gameId = Number(gameId);
      next();
    }
  }
};

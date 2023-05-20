const { isProduction } = require('../config/is-production');
const { getPgClient } = require('../config/pg');
const { formatDebugHandler } = require('../utils/functions/format-debug-handler');

module.exports = {
  /**
   * TODO: req typing
   * @param {import('express').Request} req
   * @param {import('express').Response<any, Record<string, any>, number>} res
   * @param {import('express').NextFunction} next
   */
  playerParticipation: async (req, res, next) => {
    if (!isProduction) console.info(formatDebugHandler('playerParticipation'));

    const { gameId, playerId } = req.data;
    const existsResult = await getPgClient().query(
      'SELECT EXISTS (SELECT gp.id FROM public.game_player gp WHERE gp.player_id = $1 and gp.game_id = $2)',
      [playerId, gameId]
    );
    const isParticipant = existsResult.rows[0].exists;
    if (isParticipant) {
      next();
    } else {
      res.status(403).json({ error: `Player ${playerId} is not participant of game ${gameId}` });
    }
  }
}

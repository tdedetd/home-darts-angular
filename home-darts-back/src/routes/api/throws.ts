import { Request, Response, Router } from 'express';
import { paramGameId } from '../../handlers/param-game-id.js';
import { checkGameExistence } from '../../handlers/check-game-existence.js';
import { getPgClient } from '../../config/pg-connect.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { SqlQueries } from '../../utils/types/sql-queries.enum.js';
import { Throw } from '../../utils/models/throw.interface.js';
import { ThrowsGrouped } from '../../utils/models/throws-grouped.interface.js';
import { queryPlayerIdOptional } from '../../handlers/query-player-id-optional.js';

export const throwsRouter = Router();

throwsRouter.get('/:gameId([0-9]+)',
  paramGameId,
  checkGameExistence,
  queryPlayerIdOptional,
  // TODO: check permissions auth 403
  async (
    req: Request,
    res: Response<Throw[], { gameId: number, playerId?: number }>
  ) => {
    const { gameId, playerId } = res.locals;
    const throwsResult = await getPgClient().query<Throw>(getSql(SqlQueries.Throws), [gameId]);
    res.json(throwsResult.rows);
  }
);

throwsRouter.get('/grouped/:gameId([0-9]+)',
  paramGameId,
  checkGameExistence,
  // TODO: check permissions auth 403
  async (
    req: Request,
    res: Response<ThrowsGrouped[], { gameId: number }>
  ) => {
    const gameId = res.locals.gameId;
    const throwsGroupedResult = await getPgClient().query<ThrowsGrouped>(getSql(SqlQueries.ThrowsGrouped), [gameId]);
    res.json(throwsGroupedResult.rows);
  }
);

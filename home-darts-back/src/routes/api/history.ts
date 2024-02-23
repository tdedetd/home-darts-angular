import { Request, Response, Router } from 'express';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { queryPagination } from '../../handlers/query-pagination.js';
import { queryPlayerId } from '../../handlers/query-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { getPgClient } from '../../config/pg-connect.js';
import { SqlQueries } from '../../utils/types/sql-queries.enum.js'; 
import { History } from '../../utils/models/history.interface.js';
import { LimitOffset } from '../../utils/models/limit-offset.interface.js';

export const historyRouter = Router();

historyRouter.use(queryPlayerId, checkPlayerExistence);

historyRouter.get('/', queryPagination, async (
  req: Request,
  res: Response<History[], LimitOffset & { playerId: number }>
) => {
  const { limit, offset, playerId } = res.locals;
  const historyRes = await getPgClient().query<History>(
    getSql(SqlQueries.History),
    [playerId, limit, offset]
  );
  res.json(historyRes.rows);
});

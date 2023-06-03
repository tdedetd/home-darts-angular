import { Request, Response, Router } from 'express';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { queryPagination } from '../../handlers/query-pagination.js';
import { queryPlayerId } from '../../handlers/query-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { getPgClient } from '../../config/pg-connect.js';
import { SqlQueries } from '../../utils/types/sql-queries.enum.js'; 
import { PaginationParams } from '../../utils/models/pagination-params.interface.js';
import { History } from '../../utils/models/history.interface.js';

export const historyRouter = Router();

historyRouter.use(queryPlayerId, checkPlayerExistence);

historyRouter.get('/', queryPagination, async (
  req: Request,
  res: Response<History[], PaginationParams & { playerId: number }>
) => {
  const { page, size, playerId } = res.locals;
  const historyRes = await getPgClient().query<History>(
    getSql(SqlQueries.History),
    [playerId, size, page * size]
  );
  res.json(historyRes.rows);
});

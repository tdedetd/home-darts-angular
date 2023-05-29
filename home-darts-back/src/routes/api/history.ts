import { Response, Router } from 'express';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { queryPagination } from '../../handlers/query-pagination.js';
import { queryPlayerId } from '../../handlers/query-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { getPgClient } from '../../config/pg-connect.js';
import { RequestWithData } from '../../utils/types/request-with-data.type.js';
import { SqlQueries } from '../../utils/types/sql-queries.enum.js';
import { PaginationParams } from '../../utils/models/pagination-params.interface';

export const historyRouter = Router();

historyRouter.use(queryPlayerId, checkPlayerExistence);

historyRouter.get('/', queryPagination, async (
  req: RequestWithData<PaginationParams & { playerId: number }>,
  res: Response
) => {
  const { page, size, playerId } = req.data as NonNullable<typeof req.data>;
  const historyRes = await getPgClient().query(
    getSql(SqlQueries.History),
    [playerId, size, page * size]
  );
  res.json(historyRes.rows);
});

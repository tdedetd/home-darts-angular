import { Router } from 'express';
import { checkPlayerExistence } from '../../handlers/check-player-existence.js';
import { queryPagination } from '../../handlers/query-pagination.js';
import { queryPlayerId } from '../../handlers/query-player-id.js';
import { getSql } from '../../utils/functions/get-sql.js';
import { getPgClient } from '../../config/pg-connect.js';
import { RequestWithData } from '../../utils/types/request-with-data.type.js';

export const historyRouter = Router();

historyRouter.use(queryPlayerId, checkPlayerExistence);

historyRouter.get('/', queryPagination, async (req: RequestWithData, res) => {
  const { page, size } = req.data;
  const historyRes = await getPgClient().query(
    getSql('history'),
    [req.data.playerId, size, page * size]
  );
  res.json(historyRes.rows);
});

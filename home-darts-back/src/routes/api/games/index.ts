import { Request, Response, Router } from 'express';
import { aroundTheClockRouter } from './around-the-clock.js';
import { GameInfo } from '../../../utils/models/game-info.interface';
import { getPgClient } from '../../../config/pg-connect.js';
import { paramGameId } from '../../../handlers/param-game-id.js';
import { checkGameExistence } from '../../../handlers/check-game-existence.js';
import { getSql } from '../../../utils/functions/get-sql.js';
import { SqlQueries } from '../../../utils/types/sql-queries.enum.js';
import { Player } from '../../../utils/models/player.interface.js';
import { GameParam } from '../../../utils/models/game-param.interface.js';
import { gameParamCastValueStrategy } from '../../../utils/constants/game-param-cast-value-strategy.js';

export const gamesRouter = Router();

gamesRouter.use('/around-the-clock', aroundTheClockRouter);

gamesRouter.get('/:gameId([0-9]+)',
  paramGameId,
  checkGameExistence, async (
    req: Request,
    res: Response<GameInfo, { gameId: number }>
  ) => {
    const gameId = res.locals.gameId;
    await getPgClient().query('BEGIN');
    const gameRecordResult = await getPgClient().query<Omit<GameInfo, 'params' | 'players'>>(
      'SELECT g.id, g.creation_date as "creationDate", g.gamemode_name as "gamemodeName", g.is_completed as "isCompleted" FROM public.game g WHERE id = $1',
      [gameId]
    );
    const paramsResult = await getPgClient().query<GameParam>(getSql(SqlQueries.GameParams), [gameId]);
    const playersResult = await getPgClient().query<Player>(getSql(SqlQueries.GameParticipants), [gameId]);

    await getPgClient().query('COMMIT');

    res.json({
      ...gameRecordResult.rows[0],
      params: Object.fromEntries(paramsResult.rows.map(param => [param.name, gameParamCastValueStrategy[param.datatype](param.value)])),
      players: playersResult.rows,
    });
  }
);

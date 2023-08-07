import { Router } from 'express';
import { gamesRouter } from './games/index.js';
import { historyRouter } from './history.js';
import { playersRouter } from './players.js';
import { throwsRouter } from './throws.js';

export const apiRouter = Router();

apiRouter.use('/games', gamesRouter);
apiRouter.use('/history', historyRouter);
apiRouter.use('/players', playersRouter);
apiRouter.use('/throws', throwsRouter);

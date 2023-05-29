import { Router } from 'express';
import { aroundTheClockRouter } from './around-the-clock.js';

export const gamesRouter = Router();

gamesRouter.use('/around-the-clock', aroundTheClockRouter);

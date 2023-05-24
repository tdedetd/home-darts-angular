import { Router } from 'express';
import { apiRouter } from './api/index.js';
import nocache from '../../node_modules/nocache/index.js';

export const router = Router();

router.use(nocache());
router.use('/api', apiRouter);

import { Router } from 'express';
import { apiRouter } from './api/index.js';
import nocache from 'nocache';

export const router = Router();

router.use(nocache());
router.use('/api', apiRouter);

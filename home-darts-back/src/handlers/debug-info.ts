import { NextFunction, Request, Response } from 'express';

export const debugInfo = (req: Request, res: Response, next: NextFunction) => {
  console.info('------------------------------------');
  console.info(req.method, req.url);
  next();
};

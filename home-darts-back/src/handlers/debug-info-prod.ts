import { NextFunction, Request, Response } from 'express';

export const debugInfoProd = (req: Request, res: Response, next: NextFunction) => {
  console.info(req.method, req.url);
  next();
};

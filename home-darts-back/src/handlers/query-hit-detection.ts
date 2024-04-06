import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/functions/is-empty.js';
import { handlerDebug } from '../utils/functions/handler-debug.js';
import { SectionTypes } from '../utils/types/section-types.enum.js';
import { isSectionType } from '../utils/functions/type-guards/is-section-type.js';

export const queryHitDetection = (
  req: Request,
  res: Response<unknown, { hitDetection: SectionTypes }>,
  next: NextFunction
) => {
  handlerDebug('queryHitDetection');

  const hitDetection = req.query.hitDetection;
  if (isEmpty(hitDetection)) {
    res.status(400).json({
      error: 'Query param "hitDetection" is required'
    });
  } else if (typeof hitDetection === 'string' && isSectionType(hitDetection)) {
    res.locals = { ...res.locals, hitDetection };
    next();
  } else {
    res.status(400).json({
      error: 'Incorrect query param "hitDetection"'
    })
  }
};

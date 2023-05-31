import { GameDirections } from '../types/game-directions.enum.js';
import { GameParamTypes } from '../types/game-param-types.enum.js';
import { SectionTypes } from '../types/section-types.enum.js';

export interface AroundTheClockStartParams {
  [GameParamTypes.Direction]: GameDirections;
  [GameParamTypes.FastGame]: boolean;
  [GameParamTypes.HitDetection]: SectionTypes;
  [GameParamTypes.IncludeBull]: boolean;
}

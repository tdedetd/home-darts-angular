import { TimingFunction } from './timing-function.type';
import { TimingFunctions } from './timing-functions.enum';

export interface AnimationOptions {
  durationMs: number;
  refreshTimeout?: number;
  timingFunction?: TimingFunctions | TimingFunction;
}

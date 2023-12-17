import { AnimationStates } from './animation-states.enum';
import { TimingFunction } from './timing-function.type';
import { TimingFunctions } from './timing-functions.enum';

export interface AnimationOptions {
  durationMs: number;
  refreshTimeout?: number;
  onFinishState?: AnimationStates;
  timingFunction?: TimingFunctions | TimingFunction;
}

import { TimingFunction } from '../models/timing-function.type';
import { TimingFunctions } from '../models/timing-functions.enum';

export const timingFunctionsMapper: Record<TimingFunctions, TimingFunction> = {
  [TimingFunctions.Linear]: (phase) => phase,
  [TimingFunctions.EaseInQuadratic]: (phase) => Math.pow(phase, 2),
  [TimingFunctions.EaseOutQuadratic]: (phase) => 1 - Math.pow(1 - phase, 2),
  [TimingFunctions.EaseInOutQuadratic]: (phase) => phase < 0.5 ? 2 * Math.pow(phase, 2) : 1 - Math.pow(-2 * phase + 2, 2) / 2,
  [TimingFunctions.EaseInCubic]: (phase) => Math.pow(phase, 3),
  [TimingFunctions.EaseOutCubic]: (phase) => 1 - Math.pow(1 - phase, 3),
  [TimingFunctions.EaseInOutCubic]: (phase) => phase < 0.5 ? 4 * Math.pow(phase, 3) : 1 - Math.pow(-2 * phase + 2, 3) / 2,
  [TimingFunctions.EaseInQuartic]: (phase) => Math.pow(phase, 4),
  [TimingFunctions.EaseOutQuartic]: (phase) => 1 - Math.pow(1 - phase, 4),
  [TimingFunctions.EaseInOutQuartic]: (phase) => phase < 0.5 ? 8 * Math.pow(phase, 4) : 1 - Math.pow(-2 * phase + 2, 4) / 2,
};

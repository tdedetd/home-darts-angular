import { TimeUnits } from './time-units.enum';

export interface TimePart {
  unit: TimeUnits;
  value: number;
}

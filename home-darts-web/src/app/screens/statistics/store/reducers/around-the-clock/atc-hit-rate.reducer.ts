import { createReducer, on } from '@ngrx/store';
import { atcHitRateLoaded, changePlayerSelectedStart, resetStatistics } from '../../actions/statistics.actions';
import { HitRate } from '../../../models/hit-rate.interface';

const defaultValue = null;

export const atcHitRateReducer = createReducer<HitRate[] | null>(
  defaultValue,
  on(changePlayerSelectedStart, resetStatistics, (): null => defaultValue),
  on(atcHitRateLoaded, (_, { hitRate }): HitRate[] => hitRate),
);

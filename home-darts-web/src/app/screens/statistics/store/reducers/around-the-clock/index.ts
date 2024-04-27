import { combineReducers } from '@ngrx/store';
import { AtcStatisticsState } from '../../../models/atc-statistics-state.interface';
import { filterReducer } from './filter.reducer';
import { atcHitRateReducer } from './atc-hit-rate.reducer';

export const aroundTheClockReducer = combineReducers<AtcStatisticsState>({
  filter: filterReducer,
  hitRate: atcHitRateReducer,
});

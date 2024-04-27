import { createSelector } from '@ngrx/store';
import { selectAtcStatisticsState } from './atc-statistics-state.selector';

export const selectAtcHitRate = createSelector(
  selectAtcStatisticsState,
  (state) => state.hitRate
);

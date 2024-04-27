import { createSelector } from '@ngrx/store';
import { selectAtcStatisticsState } from './atc-statistics-state.selector';

export const selectAtcFilter = createSelector(
  selectAtcStatisticsState,
  (state) => state.filter
);

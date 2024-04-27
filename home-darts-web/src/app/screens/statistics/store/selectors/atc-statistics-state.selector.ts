import { createSelector } from '@ngrx/store';
import { selectStatisticsState } from './statistics-state.selector';

export const selectAtcStatisticsState = createSelector(
  selectStatisticsState,
  (state) => state?.aroundTheClock
);

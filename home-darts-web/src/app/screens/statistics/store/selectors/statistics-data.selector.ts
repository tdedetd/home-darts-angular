import { createSelector } from '@ngrx/store';
import { selectStatisticsState } from './statistics-state.selector';

export const selectStatisticsData = createSelector(
  selectStatisticsState,
  (state) => state.statsData
);

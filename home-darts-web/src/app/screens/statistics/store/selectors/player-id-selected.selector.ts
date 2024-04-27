import { createSelector } from '@ngrx/store';
import { selectStatisticsState } from './statistics-state.selector';

export const selectPlayerIdSelected = createSelector(
  selectStatisticsState,
  (state) => state.playerIdSelected
);

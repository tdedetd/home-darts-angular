import { createSelector } from '@ngrx/store';
import { selectStatisticsState } from './statistics-state.selector';

export const selectPlayers = createSelector(
  selectStatisticsState,
  (state) => state.players
);

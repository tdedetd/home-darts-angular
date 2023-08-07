import { createSelector } from '@ngrx/store';
import { selectUpcomingSectorsForCurrentPlayer } from './upcoming-sectors-for-current-player.selector';

export const selectCurrentSectorForCurrentPlayer = createSelector(
  selectUpcomingSectorsForCurrentPlayer,
  (sectors: number[]): number | undefined => sectors[0]
);

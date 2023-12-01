import { createSelector } from '@ngrx/store';
import { selectUpcomingSectorsForCurrentPlayer } from './upcoming-sectors-for-current-player.selector';
import { DartboardSector } from '@models/types/dartboard-sector.type';

export const selectCurrentSectorForCurrentPlayer = createSelector(
  selectUpcomingSectorsForCurrentPlayer,
  (sectors: DartboardSector[]): DartboardSector | undefined => sectors[0]
);

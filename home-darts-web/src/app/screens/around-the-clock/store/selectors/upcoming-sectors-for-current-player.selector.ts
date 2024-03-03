import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { selectCurrentPlayerId } from './current-player-id.selector';
import { selectSectors } from './sectors.selector';
import { throwsPerTurn } from '@constants/throws-per-turn';
import { DartboardSector } from '@models/types/dartboard-sector.type';

export const selectUpcomingSectorsForCurrentPlayer = createSelector(
  selectCurrentPlayerId,
  selectParticipants,
  selectSectors,
  (playerId: number | null, participants, sectors: DartboardSector[]) => {
    if (playerId === null) {
      return [];
    }
    const hits = participants[playerId].hits;
    return sectors.slice(hits, hits + throwsPerTurn);
  }
);

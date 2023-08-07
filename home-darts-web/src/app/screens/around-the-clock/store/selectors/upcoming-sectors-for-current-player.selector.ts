import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { AtcParticipant } from '../../models/atc-participant.interface';
import { selectCurrentPlayerId } from './current-player-id.selector';
import { selectSectors } from './sectors.selector';

export const selectUpcomingSectorsForCurrentPlayer = createSelector(
  selectCurrentPlayerId,
  selectParticipants,
  selectSectors,
  (playerId: number | null, participants: Partial<Record<number, AtcParticipant>>, sectors: number[]) => {
    if (playerId === null) return [];
    const hits = participants[playerId]?.hits ?? 0;
    return sectors.slice(hits, hits + 3);
  }
);

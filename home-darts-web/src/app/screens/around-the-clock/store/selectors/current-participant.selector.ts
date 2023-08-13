import { createSelector } from '@ngrx/store';
import { selectCurrentPlayerId } from './current-player-id.selector';
import { selectParticipants } from './participants.selector';
import { PlayerApi } from '../../../../models/player-api.interface';
import { AtcParticipant } from '../../models/atc-participant.interface';

export const selectCurrentParticipant = createSelector(
  selectCurrentPlayerId,
  selectParticipants,
  (id: PlayerApi['id'] | null, participants: Partial<Record<PlayerApi['id'], AtcParticipant>>) =>
    id !== null ? participants[id] : null
);

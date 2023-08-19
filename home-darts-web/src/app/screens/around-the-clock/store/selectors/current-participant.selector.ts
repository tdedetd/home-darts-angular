import { createSelector } from '@ngrx/store';
import { selectCurrentPlayerId } from './current-player-id.selector';
import { selectParticipants } from './participants.selector';
import { PlayerApi } from '../../../../models/player-api.interface';
import { AtcParticipants } from '../../models/atc-participants.type';

export const selectCurrentParticipant = createSelector(
  selectCurrentPlayerId,
  selectParticipants,
  (id: PlayerApi['id'] | null, participants: AtcParticipants) => id !== null ? participants[id] : null
);

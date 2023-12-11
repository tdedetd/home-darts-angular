import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { TurnThrows } from '../../models/turn-throws.type';
import { PlayerApi } from '@models/player-api.interface';
import { AtcParticipants } from '../../models/atc-participants.type';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectTurnThrows = (playerId: PlayerApi['id']) => createSelector(
  selectParticipants,
  (participants: AtcParticipants): TurnThrows => participants[playerId]?.turnThrows ?? []
);

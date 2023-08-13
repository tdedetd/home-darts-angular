import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { AtcParticipant } from '../../models/atc-participant.interface';
import { TurnThrows } from '../../models/turn-throws.type';
import { PlayerApi } from '@models/player-api.interface';

export const selectTurnThrows = (playerId: PlayerApi['id']) => createSelector(
  selectParticipants,
  (participants: Partial<Record<PlayerApi['id'], AtcParticipant>>): TurnThrows =>
    participants[playerId]?.turnThrows ?? []
);

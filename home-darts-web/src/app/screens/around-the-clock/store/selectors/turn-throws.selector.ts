import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { TurnHits } from '../../models/turn-hits.type';
import { PlayerApi } from '@models/player-api.interface';
import { AtcParticipants } from '../../models/atc-participants.type';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectTurnHits = (playerId: PlayerApi['id']) => createSelector(
  selectParticipants,
  (participants: AtcParticipants): TurnHits => participants[playerId].turnHits
);

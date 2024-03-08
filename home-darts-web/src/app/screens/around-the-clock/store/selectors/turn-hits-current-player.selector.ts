import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { selectCurrentPlayerId } from './current-player-id.selector';
import { isNotEmpty } from '@functions/type-guards/is-not-empty';

export const selectTurnHitsCurrentPlayer = createSelector(
  selectParticipants,
  selectCurrentPlayerId,
  (participants, playerId) => isNotEmpty(playerId) ? participants[playerId].turnHits : null
);

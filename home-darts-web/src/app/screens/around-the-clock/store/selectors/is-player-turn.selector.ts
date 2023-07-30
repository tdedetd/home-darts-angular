import { createSelector } from '@ngrx/store';
import { selectCurrentPlayerId } from './current-player-id.selector';

export const selectIsPlayerTurn = (playerId: number) => createSelector(
  selectCurrentPlayerId,
  (currentPlayerId: number | null) => currentPlayerId === playerId
);

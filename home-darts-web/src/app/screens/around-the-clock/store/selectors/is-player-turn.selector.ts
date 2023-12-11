import { createSelector } from '@ngrx/store';
import { selectCurrentPlayerId } from './current-player-id.selector';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectIsPlayerTurn = (playerId: number) => createSelector(
  selectCurrentPlayerId,
  (currentPlayerId: number | null) => currentPlayerId === playerId
);

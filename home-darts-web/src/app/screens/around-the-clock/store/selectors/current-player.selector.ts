import { createSelector } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { selectCurrentPlayerId } from './current-player-id.selector';
import { selectPlayers } from './players.selector';

export const selectCurrentPlayer = createSelector(
  selectCurrentPlayerId,
  selectPlayers,
  (playerId: PlayerApi['id'] | null, players: PlayerApi[]) =>
    playerId !== null
      ? (players.find(({ id }) => id === playerId) ?? null)
      : null
);

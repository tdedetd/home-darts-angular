import { createSelector } from '@ngrx/store';
import { selectPlayers } from './players.selector';
import { selectPlayerIdSelected } from './player-id-selected.selector';
import { PlayerApi } from '@models/player-api.interface';

export const selectPlayerSelected = createSelector(
  selectPlayers,
  selectPlayerIdSelected,
  (players, playerIdSelected): PlayerApi | undefined => {
    return players.find(({ id }) => playerIdSelected === id);
  }
);

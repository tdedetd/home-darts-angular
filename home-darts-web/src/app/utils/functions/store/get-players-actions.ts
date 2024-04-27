import { createAction, props } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { Any } from '@models/types/any.type';

export function getPlayersActions(source: string) {
  return {
    loadPlayers: createAction(`${source} Players Loading Started`),
    loadPlayersSuccess: createAction(`${source} Players Loaded Successfully`, props<{ players: PlayerApi[] }>()),
    loadPlayersError: createAction(`${source} Error While Loading Players`, props<{ error: Any }>()),
  }
}

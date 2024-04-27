import { createAction, props } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { getPlayersActions } from '@functions/store/get-players-actions';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { Any } from '@models/types/any.type';

const source = '[Statistics]';

export const initStatistics = createAction(`${source} Init`);
export const resetStatistics = createAction(`${source} Reset`);

export const changePlayerSelectedStart = createAction(
  `${source} Change player start`,
  props<{ playerId: PlayerApi['id'] }>()
);

export const changePlayerSelectedEnd = createAction(
  `${source} Change player end`,
  props<{ playerId: PlayerApi['id'] }>()
);

export const { loadPlayers, loadPlayersError, loadPlayersSuccess } = getPlayersActions(source);

export const statisticsLoaded = createAction(
  `${source} Loaded successfully`,
  props<{ stats: PlayerStatsApi }>()
);

export const statisticsError = createAction(`${source} Error while loading`, props<{ error: Any }>());

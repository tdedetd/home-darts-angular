import { createAction, props } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { getPlayersActions } from '@functions/store/get-players-actions';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { Any } from '@models/types/any.type';
import { HitRate } from '../../models/hit-rate.interface';

const source = '[Statistics]';

export const initStatistics = createAction(`${source} Init`);
export const clearStatistics = createAction(`${source} Clear`);

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

export const atcHitRateLoaded = createAction(`${source} ATC hit rate loaded`, props<{ hitRate: HitRate[] }>());
export const atcHitRateError = createAction(`${source} ATC hit rate error`, props<{ error: Any }>());

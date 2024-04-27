import { createReducer, on } from '@ngrx/store';
import { changePlayerSelectedStart, resetStatistics, statisticsLoaded } from '../actions/statistics.actions';
import { PlayerStatsApi } from '@models/player-stats-api.interface';

const defaultValue = null;

export const statsDataReducer = createReducer<PlayerStatsApi | null>(
  defaultValue,
  on(changePlayerSelectedStart, resetStatistics, (): null => defaultValue),
  on(statisticsLoaded, (_, { stats }): PlayerStatsApi => stats),
);

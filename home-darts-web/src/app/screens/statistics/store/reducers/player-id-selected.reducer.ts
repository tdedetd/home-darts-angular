import { createReducer, on } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { changePlayerSelectedEnd, clearStatistics } from '../actions/statistics.actions';

const defaultValue = null;

export const playerIdSelectedReducer = createReducer<PlayerApi['id'] | null>(
  defaultValue,
  on(changePlayerSelectedEnd, (_, { playerId }): PlayerApi['id'] => playerId),
  on(clearStatistics, (): null => defaultValue),
);

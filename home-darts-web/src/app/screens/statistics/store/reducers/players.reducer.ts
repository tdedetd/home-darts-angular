import { createReducer, on } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { loadPlayersSuccess, clearStatistics } from '../actions/statistics.actions';

const defaultValue: PlayerApi[] = [];

export const playersReducer = createReducer<PlayerApi[]>(
  defaultValue,
  on(clearStatistics, (): PlayerApi[] => defaultValue),
  on(loadPlayersSuccess, (_, { players }): PlayerApi[] => players),
);

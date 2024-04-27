import { ActionReducerMap } from '@ngrx/store';
import { playerIdSelectedReducer } from './player-id-selected.reducer';
import { statsDataReducer } from './stats-data.reducer';
import { StatisticsState } from '../../models/statistics-state.interface';
import { aroundTheClockReducer } from './around-the-clock';
import { playersReducer } from './players.reducer';

export const statisticsReducer: ActionReducerMap<StatisticsState> = {
  players: playersReducer,
  playerIdSelected: playerIdSelectedReducer,
  statsData: statsDataReducer,
  aroundTheClock: aroundTheClockReducer,
};

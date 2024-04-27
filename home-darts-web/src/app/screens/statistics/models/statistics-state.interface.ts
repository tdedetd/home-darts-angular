import { PlayerApi } from '@models/player-api.interface';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { AtcStatisticsState } from './atc-statistics-state.interface';

export interface StatisticsState {
  players: PlayerApi[];
  playerIdSelected: PlayerApi['id'] | null;
  statsData: PlayerStatsApi | null;
  aroundTheClock: AtcStatisticsState;
}

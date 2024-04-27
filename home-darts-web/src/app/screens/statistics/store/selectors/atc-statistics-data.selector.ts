import { createSelector } from '@ngrx/store';
import { selectStatisticsData } from './statistics-data.selector';
import { PlayerStatsApi } from '@models/player-stats-api.interface';

export const selectAtcStatisticsData = createSelector(
  selectStatisticsData,
  (state): PlayerStatsApi['aroundTheClock'] | undefined => state?.aroundTheClock
);

import { createSelector } from '@ngrx/store';
import { selectAtcState } from './atc-state.selector';
import { GameLoadingStatuses } from '@models/enums/game-loading-statuses.enum';

export const selectInitStatus = createSelector(
  selectAtcState,
  (state): GameLoadingStatuses => state.initStatus,
);

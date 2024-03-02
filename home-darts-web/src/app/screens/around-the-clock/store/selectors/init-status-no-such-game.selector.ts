import { createSelector } from '@ngrx/store';
import { selectInitStatus } from './init-status.selector';
import { GameLoadingStatuses } from '@models/enums/game-loading-statuses.enum';

export const selectInitStatusNoSuchGame = createSelector(
  selectInitStatus,
  (status) => status === GameLoadingStatuses.NoSuchGame
);

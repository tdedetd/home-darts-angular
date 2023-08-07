import { createSelector } from '@ngrx/store';
import { selectAtcGameInfo } from './game-info.selector';
import { GameInfoApi } from '@models/game-info-api.interface';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';

export const selectIsGameCompleted = createSelector(
  selectAtcGameInfo,
  ((gameInfo: GameInfoApi<AroundTheClockParams> | null) => Boolean(gameInfo?.isCompleted))
);

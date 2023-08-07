import { createSelector } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { selectAtcState } from './atc-state.selector';

export const selectAtcGameInfo = createSelector(
  selectAtcState,
  (aroundTheClock: AroundTheClockState) => aroundTheClock.gameInfo
);

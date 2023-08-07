import { createSelector } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { selectAtcState } from './atc-state.selector';

export const selectLoading = createSelector(
  selectAtcState,
  (aroundTheClock: AroundTheClockState) => aroundTheClock.loading
);

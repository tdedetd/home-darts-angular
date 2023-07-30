import { createSelector } from '@ngrx/store';
import { selectAtcState } from './atc-state.selector';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';

export const selectParticipants = createSelector(
  selectAtcState,
  (aroundTheClock: AroundTheClockState) => aroundTheClock.participants
);

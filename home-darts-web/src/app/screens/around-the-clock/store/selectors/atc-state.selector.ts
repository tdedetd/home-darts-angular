import { AroundTheClockState } from '../../models/around-the-clock-state.interface';

export const selectAtcState = (state: { aroundTheClock: AroundTheClockState }) => state.aroundTheClock;

import { createFeatureSelector } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';

export const selectAtcState = createFeatureSelector<AroundTheClockState>('aroundTheClock');

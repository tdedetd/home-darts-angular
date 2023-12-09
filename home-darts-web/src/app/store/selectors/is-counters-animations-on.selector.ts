import { createSelector } from '@ngrx/store';
import { selectSettings } from './settings.selector';

export const selectIsCountersAnimationsOn = createSelector(
  selectSettings,
  (state) => state.countersAnimations
);

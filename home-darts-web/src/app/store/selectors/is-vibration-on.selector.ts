import { createSelector } from '@ngrx/store';
import { selectSettings } from './settings.selector';

export const selectIsVibrationOn = createSelector(
  selectSettings,
  (state) => state.vibration
);

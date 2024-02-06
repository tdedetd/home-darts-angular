import { createSelector } from '@ngrx/store';
import { selectSettings } from './settings.selector';

export const selectIsSoundsOn = createSelector(
  selectSettings,
  (state) => state.sounds
);

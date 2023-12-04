import { createSelector } from '@ngrx/store';
import { selectSettings } from './settings.selector';

export const selectDartboardStyle = createSelector(
  selectSettings,
  (state) => state.dartboardStyle
);

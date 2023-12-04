import { createSelector } from '@ngrx/store';
import { selectGlobalProgressBarState } from './global-progress-bar-state.selector';
import { GlobalProgressBarState } from '../models/global-progress-bar-state.interface';

export const selectGlobalProgressBarShown = createSelector(
  selectGlobalProgressBarState,
  (state: GlobalProgressBarState) => state.shown
);

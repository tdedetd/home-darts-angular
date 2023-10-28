import { createSelector } from '@ngrx/store';
import { selectGlobalProgressBarState } from './global-progress-bar-state.selector';
import { AppState } from '../models/app-state.interface';

export const selectGlobalProgressBarShown = createSelector(
  selectGlobalProgressBarState,
  (state: AppState['globalProgressBar']) => state.shown
);

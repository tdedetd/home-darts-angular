import { createReducer, on } from '@ngrx/store';
import { hideGlobalProgressBar, showGlobalProgressBar } from '../actions/global-progress-bar.actions';
import { GlobalProgressBarState } from '../models/global-progress-bar-state';

const defaultValue: GlobalProgressBarState = {
  shown: false
};

export const globalProgressBarReducer = createReducer(
  defaultValue,
  on(showGlobalProgressBar, (state) => ({ ...state, shown: true })),
  on(hideGlobalProgressBar, (state) => ({ ...state, shown: false })),
);

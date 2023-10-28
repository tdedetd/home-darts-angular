import { createReducer, on } from '@ngrx/store';
import { hideGlobalProgressBar, showGlobalProgressBar } from '../actions/global-progress-bar.actions';
import { AppState } from '../models/app-state.interface';

const defaultValue: AppState['globalProgressBar'] = {
  shown: false
};

export const globalProgressBarReducer = createReducer(
  defaultValue,
  on(showGlobalProgressBar, (state) => ({ ...state, shown: true })),
  on(hideGlobalProgressBar, (state) => ({ ...state, shown: false })),
);

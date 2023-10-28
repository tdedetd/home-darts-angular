import { ActionReducerMap } from '@ngrx/store';
import { globalProgressBarReducer } from './global-progress-bar.reducer';
import { AppState } from '../models/app-state.interface';

export const reducers: ActionReducerMap<AppState> = {
  globalProgressBar: globalProgressBarReducer,
};

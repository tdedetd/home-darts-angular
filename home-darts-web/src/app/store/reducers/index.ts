import { ActionReducerMap } from '@ngrx/store';
import { globalProgressBarReducer } from './global-progress-bar.reducer';
import { AppState } from '../models/app-state.interface';
import { sidenavOpenedReducer } from './sidenav-opened.reducer';

export const reducers: ActionReducerMap<AppState> = {
  globalProgressBar: globalProgressBarReducer,
  sidenavOpened: sidenavOpenedReducer,
};

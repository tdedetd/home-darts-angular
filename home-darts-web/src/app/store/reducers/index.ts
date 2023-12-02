import { ActionReducerMap } from '@ngrx/store';
import { globalProgressBarReducer } from './global-progress-bar.reducer';
import { AppState } from '../models/app-state.interface';
import { sidenavOpenedReducer } from './sidenav-opened.reducer';
import { settingsStateReducer } from './settings-state.reducer';

export const reducers: ActionReducerMap<AppState> = {
  globalProgressBar: globalProgressBarReducer,
  settings: settingsStateReducer,
  sidenavOpened: sidenavOpenedReducer,
};

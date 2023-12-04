import { SettingsState } from '@models/settings-state.interface';
import { GlobalProgressBarState } from './global-progress-bar-state.interface';

export interface AppState {
  globalProgressBar: GlobalProgressBarState;
  settings: SettingsState;
  sidenavOpened: boolean;
}

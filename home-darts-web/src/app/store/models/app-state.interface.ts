import { SettingsState } from '@models/settings-state';
import { GlobalProgressBarState } from './global-progress-bar-state';

export interface AppState {
  globalProgressBar: GlobalProgressBarState;
  settings: SettingsState;
  sidenavOpened: boolean;
}

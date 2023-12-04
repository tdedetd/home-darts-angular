import { createReducer, on } from '@ngrx/store';
import { SettingsState } from '@models/settings-state.interface';
import { settingsLoaded, updateSettings } from '../actions/settings.actions';
import { defaultSettings } from '@constants/default-settings';

export const settingsStateReducer = createReducer(
  defaultSettings,
  on(settingsLoaded, updateSettings, (_, { settings }): SettingsState => settings),
);

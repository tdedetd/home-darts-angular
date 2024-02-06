import { createFeatureSelector } from '@ngrx/store';
import { SettingsState } from '@models/settings-state.interface';
import { settingsKey } from '../constants/state-features/settings-key';

export const selectSettings = createFeatureSelector<SettingsState>(settingsKey);

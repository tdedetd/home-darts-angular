import { createAction, props } from '@ngrx/store';
import { SettingsState } from '@models/settings-state.interface';

const source = '[Settings]';

export const loadSettings = createAction(`${source} Load`);

export const settingsLoaded = createAction(`${source} Loaded Successfully`, props<{ settings: SettingsState }>());

export const updateSettings = createAction(`${source} Update`, props<{ settings: SettingsState }>());

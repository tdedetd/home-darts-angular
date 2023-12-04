import { SettingsState } from '@models/settings-state.interface';
import { isNotEmpty } from './is-not-empty';

const settingsKeys: Record<keyof SettingsState, void> = {
  dartboardStyle: void 0,
  sounds: void 0,
  vibration: void 0,
};

export function isSettings(
  settings: Partial<SettingsState>
): settings is SettingsState {
  return Object.keys(settingsKeys)
    .filter((key): key is keyof SettingsState => true)
    .every((key) => isNotEmpty(settings[key]));
}

import { SettingsState } from '@models/settings-state.interface';
import { isNotEmpty } from './is-not-empty';

const settingsKeys: Record<keyof SettingsState, void> = {
  countersAnimations: undefined,
  dartboardStyle: undefined,
  language: undefined,
  sounds: undefined,
  vibration: undefined,
};

export function isSettings(
  settings: Partial<SettingsState>
): settings is SettingsState {
  return Object.keys(settingsKeys)
    .filter((key): key is keyof SettingsState => true)
    .every((key) => isNotEmpty(settings[key]));
}

import { SettingsState } from '@models/settings-state.interface';
import { isNotEmpty } from './is-not-empty';

const settingsKeys: Record<keyof SettingsState, void> = {
  dartboardStyle: undefined,
  sounds: undefined,
  vibration: undefined,
  countersAnimations: undefined,
};

export function isSettings(
  settings: Partial<SettingsState>
): settings is SettingsState {
  return Object.keys(settingsKeys)
    .filter((key): key is keyof SettingsState => true)
    .every((key) => isNotEmpty(settings[key]));
}

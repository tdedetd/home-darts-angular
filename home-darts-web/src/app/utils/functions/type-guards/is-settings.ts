import { SettingsState } from '@models/settings-state';
import { isNotEmpty } from './is-not-empty';

export function isSettings(
  settings: Partial<{
    sounds: boolean;
    vibration: boolean;
  }>
): settings is SettingsState {
  return isNotEmpty(settings.sounds) && isNotEmpty(settings.vibration);
}

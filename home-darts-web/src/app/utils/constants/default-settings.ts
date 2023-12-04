import { SettingsState } from '@models/settings-state.interface';
import { DartboardStyles } from '@models/enums/dartboard-styles.enum';

export const defaultSettings: SettingsState = {
  dartboardStyle: DartboardStyles.Material,
  sounds: true,
  vibration: true,
};

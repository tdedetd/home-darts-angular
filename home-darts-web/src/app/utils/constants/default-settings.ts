import { SettingsState } from '@models/settings-state.interface';
import { DartboardStyles } from '@models/enums/dartboard-styles.enum';
import { Languages } from '../../models/enums/languages.enum';

export const defaultSettings: SettingsState = {
  countersAnimations: true,
  dartboardStyle: DartboardStyles.Material,
  language: Languages.English,
  sounds: true,
  vibration: true,
};

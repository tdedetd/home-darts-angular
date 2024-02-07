import { DartboardStyles } from './enums/dartboard-styles.enum';
import { Languages } from './enums/languages.enum';

export interface SettingsState {
  countersAnimations: boolean;
  dartboardStyle: DartboardStyles;
  language: Languages;
  sounds: boolean;
  vibration: boolean;
}

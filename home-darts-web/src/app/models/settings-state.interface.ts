import { DartboardStyles } from './enums/dartboard-styles.enum';

export interface SettingsState {
  dartboardStyle: DartboardStyles;
  sounds: boolean;
  vibration: boolean;
  countersAnimations: boolean;
}

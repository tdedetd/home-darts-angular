import { DartboardStyles } from '@models/enums/dartboard-styles.enum';
import { DartboardStyle } from '../models/dartboard-style.interface';
import { classicStyle } from './styles/classic-style';
import { materialStyle } from './styles/material-style';

export const dartboardStyleMapper: Record<DartboardStyles, DartboardStyle> = {
  [DartboardStyles.Classic]: classicStyle,
  [DartboardStyles.Material]: materialStyle,
};

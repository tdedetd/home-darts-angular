import { DartboardStyle } from '../models/dartboard-style.interface';
import { isDartboardPalette } from './is-dartboard-palete';

export function isDartboardStyle(value: any): value is DartboardStyle {
  return typeof value === 'object'
    && 'sectorHighlightMode' in value
    && ['stroke', 'fill'].includes(value.sectorHighlightMode)
    && 'palette' in value
    && isDartboardPalette(value.palette);
}

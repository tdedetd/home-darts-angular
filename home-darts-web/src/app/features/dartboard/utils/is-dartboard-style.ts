import { Any } from '@models/types/any.type';
import { DartboardStyle } from '../models/dartboard-style.interface';
import { isDartboardPalette } from './is-dartboard-palete';

export function isDartboardStyle(value: Any): value is DartboardStyle {
  return typeof value === 'object'
    && 'sectorHighlightMode' in value
    && ['stroke', 'fill'].includes(value.sectorHighlightMode)
    && 'palette' in value
    && isDartboardPalette(value.palette);
}

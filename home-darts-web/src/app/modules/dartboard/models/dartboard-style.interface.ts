import { DartboardSector } from '@models/types/dartboard-sector.type';
import { DartboardPalette } from './dartboard-palette.interface';

export interface DartboardStyle {
  sectorHighlightMode: 'stroke' | 'fill';
  palette: DartboardPalette;
  sectorColors?: { sector: DartboardSector, color: string }[];
}

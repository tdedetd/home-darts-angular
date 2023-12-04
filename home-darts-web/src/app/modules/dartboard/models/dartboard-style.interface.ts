import { DartboardPalette } from './dartboard-palette.interface';

export interface DartboardStyle {
  sectorHighlightMode: 'stroke' | 'fill';
  palette: DartboardPalette;
}

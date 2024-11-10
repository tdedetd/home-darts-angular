import { palette } from '@constants/palette';
import { DartboardStyle } from '../../models/dartboard-style.interface';

export const materialStyle: DartboardStyle = {
  sectorHighlightMode: 'fill',
  palette: {
    black: palette.blue,
    green: palette.blue,
    highlight: 'rgba(219, 159, 29, 0.6)',
    red: '#E3E7FD',
    white: '#fff',
  },
};

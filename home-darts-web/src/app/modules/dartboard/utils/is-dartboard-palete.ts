import { DartboardPalette } from '../models/dartboard-palette.interface';

export function isDartboardPalette(value: any): value is DartboardPalette {
  return typeof value === 'object'
    && 'black' in value
    && typeof value.black === 'string'
    && 'white' in value
    && typeof value.white === 'string'
    && 'green' in value
    && typeof value.green === 'string'
    && 'red' in value
    && typeof value.red === 'string'
    && 'highlight' in value
    && typeof value.highlight === 'string';
}

import { DartboardSector } from '@models/types/dartboard-sector.type';
import { isDartboardSector } from '../functions/type-guards/is-dartboard-sector';

export const sectionsInOrder: DartboardSector[] =
  Array(20)
    .fill(null)
    .map((_, index) => index + 1)
    .filter((index): index is DartboardSector => isDartboardSector(index));

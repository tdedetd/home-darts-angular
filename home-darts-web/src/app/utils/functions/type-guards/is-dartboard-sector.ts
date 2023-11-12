import { DartboardSector } from '@models/types/dartboard-sector.type';

export function isDartboardSector(value: number): value is DartboardSector {
  return value >= 0 && value <= 20 || value === 25;
}

import { DartboardSector } from '@models/types/dartboard-sector.type';

export interface HitRate {
  sector: DartboardSector;
  throws: number;
  hits: number;
}

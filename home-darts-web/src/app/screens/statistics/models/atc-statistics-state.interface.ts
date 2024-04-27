import { AtcStatisticsFilter } from './atc-statistics-filter.interface';
import { HitRate } from './hit-rate.interface';

export interface AtcStatisticsState {
  filter: AtcStatisticsFilter;
  hitRate: HitRate[] | null;
}

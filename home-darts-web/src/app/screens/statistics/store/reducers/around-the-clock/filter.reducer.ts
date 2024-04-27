import { SectionTypes } from '@models/enums/section-types.enum';
import { createReducer } from '@ngrx/store';
import { AtcStatisticsFilter } from '../../../models/atc-statistics-filter.interface';

const defaultValue: AtcStatisticsFilter = {
  hitDetection: SectionTypes.Any,
};

export const filterReducer = createReducer<AtcStatisticsFilter>(
  defaultValue,
);

import { createFeatureSelector } from '@ngrx/store';
import { StatisticsState } from '../../models/statistics-state.interface';

export const selectStatisticsState = createFeatureSelector<StatisticsState>('statistics');

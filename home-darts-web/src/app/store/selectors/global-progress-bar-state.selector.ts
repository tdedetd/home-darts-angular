import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';

export const selectGlobalProgressBarState = createFeatureSelector<AppState['globalProgressBar']>('globalProgressBar');

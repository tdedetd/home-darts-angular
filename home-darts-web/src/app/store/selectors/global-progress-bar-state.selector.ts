import { createFeatureSelector } from '@ngrx/store';
import { GlobalProgressBarState } from '../models/global-progress-bar-state';
import { globalProgressBarKey } from '../constants/state-features/global-progress-bar-key';

export const selectGlobalProgressBarState = createFeatureSelector<GlobalProgressBarState>(globalProgressBarKey);

import { createSelector } from '@ngrx/store';
import { selectDartboardStyle } from '../../../../store/selectors/dartboard-style.selector';
import { selectHitDetectionMode } from './hit-detection-mode.selector';

export const selectDartboardSettings = createSelector(
  selectDartboardStyle,
  selectHitDetectionMode,
  (dartboardStyle, hitDetectionMode) => ({ dartboardStyle, hitDetectionMode })
);

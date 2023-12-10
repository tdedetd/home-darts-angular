import { createSelector } from '@ngrx/store';
import { selectIsGameCompleted } from './is-game-completed.selector';

export const selectIsGameNotCompleted = createSelector(
  selectIsGameCompleted,
  (isCompleted) => !isCompleted
);

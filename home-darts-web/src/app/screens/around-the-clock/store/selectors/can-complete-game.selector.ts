import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';
import { isNotEmpty } from '@functions/is-not-empty';

export const selectCanCompleteGame = createSelector(
  selectParticipants,
  (participants) => Object
    .values(participants)
    .filter(isNotEmpty)
    .some(({ isCompleted }) => isCompleted)
);

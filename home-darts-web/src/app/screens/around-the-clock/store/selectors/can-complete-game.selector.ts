import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';

export const selectCanCompleteGame = createSelector(
  selectParticipants,
  (participants) => Object.values(participants).some(({ isCompleted }) => isCompleted)
);

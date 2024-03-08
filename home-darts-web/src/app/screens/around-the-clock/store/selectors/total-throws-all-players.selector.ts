import { createSelector } from '@ngrx/store';
import { selectParticipants } from './participants.selector';

export const selectTotalThrowsAllPlayers = createSelector(
  selectParticipants,
  (participants) => Object.values(participants).reduce((acc, current) => acc + current.throws, 0)
);

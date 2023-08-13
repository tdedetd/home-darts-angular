import { createSelector } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { PlayerApi } from '@models/player-api.interface';
import { AtcParticipant } from '../../models/atc-participant.interface';
import { selectPlayers } from './players.selector';
import { selectParticipants } from './participants.selector';

export const selectPlayersState = createSelector(
  selectPlayers,
  selectParticipants,
  (players: PlayerApi[], participants: AroundTheClockState['participants']): (AtcParticipant & PlayerApi)[] =>
    players.map(player => ({
      ...(participants[player.id] ?? {
        hits: 0,
        throws: 0,
        isCompleted: false,
        turnThrows: [],
      }),
      ...player,
    }))
);

import { createSelector } from '@ngrx/store';
import { PlayerApi } from '@models/player-api.interface';
import { AtcParticipant } from '../../models/atc-participant.interface';
import { selectPlayers } from './players.selector';
import { selectParticipants } from './participants.selector';
import { AtcParticipants } from '../../models/atc-participants.type';

export const selectPlayersState = createSelector(
  selectPlayers,
  selectParticipants,
  (players: PlayerApi[], participants: AtcParticipants): (AtcParticipant & PlayerApi)[] =>
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

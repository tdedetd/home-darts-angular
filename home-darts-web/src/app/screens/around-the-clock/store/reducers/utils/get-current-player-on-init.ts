import { PlayerApi } from '@models/player-api.interface';
import { ThrowsGrouped } from '@models/throws-grouped.interface';
import { ThrowApi } from '@models/throw-api.interface';
import { AroundTheClockInitError } from '../../../models/errors/around-the-clock-init-error';
import { getIsCompleted } from './get-is-completed';
import { throwsPerTurn } from '@constants/throws-per-turn';
import { isPerfectTurn } from './is-perfect-turn';
import { getTurnHits } from '../../../utils/functions/get-turn-hits';

interface PlayersTrows {
  playerId: PlayerApi['id'],
  throws: number;
  isCompleted: boolean;
}

export function getCurrentPlayerOnInit( 
  players: PlayerApi[],
  throwsGrouped: ThrowsGrouped[],
  sectors: number[],
  lastThrows: ThrowApi[],
): PlayerApi['id'] | null {
  if (lastThrows.length === 0) {
    return players[0].id;
  }

  const playersThrows: PlayersTrows[] = players
    .map(({ id }) => {
      const playerThrows = throwsGrouped.find((playerThrows) => playerThrows.playerId === id);
      return {
        playerId: id,
        throws: playerThrows?.throws ?? 0,
        isCompleted: playerThrows ? getIsCompleted(playerThrows.hits, sectors) : false,
      };
    });

  if (playersThrows.every(({ isCompleted }) => isCompleted)) {
    return null;
  }

  const lastPlayerThrown = playersThrows.find(({ playerId }) => playerId === lastThrows[0].playerId);

  if (!lastPlayerThrown) {
    throw new AroundTheClockInitError('Last player thrown not found in players list');
  }

  if (lastPlayerThrown.isCompleted) {
    return getNextNotCompletedPlayer(lastPlayerThrown, playersThrows).playerId;
  }

  if (lastPlayerThrown.throws % throwsPerTurn === 0) {
    const turnHits = getTurnHits(lastThrows.map(({ hit }) => hit));
    return isPerfectTurn(turnHits)
      ? lastPlayerThrown.playerId
      : getNextNotCompletedPlayer(lastPlayerThrown, playersThrows).playerId;
  } else {
    return lastPlayerThrown.playerId;
  }
}

function getNextNotCompletedPlayer(player: PlayersTrows, players: PlayersTrows[]): PlayersTrows {
  do {
    const index = players.indexOf(player);
    const indexNext = (index + 1) % players.length;
    player = players[indexNext];
  } while (player.isCompleted);

  return player;
}

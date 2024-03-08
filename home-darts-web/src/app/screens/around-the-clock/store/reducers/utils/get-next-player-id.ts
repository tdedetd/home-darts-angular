import { PlayerApi } from '@models/player-api.interface';
import { AroundTheClockState } from '../../../models/around-the-clock-state.interface';

export function getNextPlayerId(state: AroundTheClockState, undo = false): PlayerApi['id'] | null {
  if (!state.gameInfo) {
    return state.currentPlayerId;
  }

  const players = state.gameInfo.players
    .filter(({ id }) => !state.participants[id].isCompleted);
  const currentPlayer = players.find(({ id }) => id === state.currentPlayerId);
  if (!currentPlayer) {
    return state.currentPlayerId;
  }

  const currentPlayerIndex = players.indexOf(currentPlayer);
  const nextPlayerIndex = (currentPlayerIndex + players.length + (undo ? -1 : 1)) % players.length;
  return players[nextPlayerIndex].id;
}

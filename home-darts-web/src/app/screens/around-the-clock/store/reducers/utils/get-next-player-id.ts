import { PlayerApi } from '@models/player-api.interface';
import { AroundTheClockState } from '../../../models/around-the-clock-state.interface';

export function getNextPlayerId(state: AroundTheClockState): PlayerApi['id'] | null {
  if (!state.gameInfo || state.gameInfo.players.length === 0) return state.currentPlayerId;

  const players = state.gameInfo.players;
  const currentPlayer = players.find(({ id }) => id === state.currentPlayerId);
  if (!currentPlayer) return state.currentPlayerId;

  const currentPlayerIndex = players.indexOf(currentPlayer);
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  return players[nextPlayerIndex].id;
}

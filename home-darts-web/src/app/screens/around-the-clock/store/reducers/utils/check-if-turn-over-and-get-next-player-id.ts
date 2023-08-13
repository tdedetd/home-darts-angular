import { PlayerApi } from '@models/player-api.interface';
import { AroundTheClockState } from '../../../models/around-the-clock-state.interface';
import { throwsPerTurn } from '@constants/throws-per-turn';

export function checkIfTurnOverAndGetNextPlayerId(state: AroundTheClockState): PlayerApi['id'] | null {
  if (state.currentPlayerId === null) return state.currentPlayerId;

  const newThrowsCount = (state.participants[state.currentPlayerId]?.throws ?? 0) + 1;
  const turnIsOver = newThrowsCount % throwsPerTurn === 0;

  return turnIsOver ? getNextPlayerId(state) : state.currentPlayerId;
};

function getNextPlayerId(state: AroundTheClockState): PlayerApi['id'] | null {
  if (!state.gameInfo || state.gameInfo.players.length === 0) return state.currentPlayerId;

  const players = state.gameInfo.players;
  const currentPlayer = players.find(({ id }) => id === state.currentPlayerId);
  if (!currentPlayer) return state.currentPlayerId;

  const currentPlayerIndex = players.indexOf(currentPlayer);
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  return players[nextPlayerIndex].id;
}

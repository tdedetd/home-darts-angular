import { throwsPerTurn } from '@constants/throws-per-turn';
import { AroundTheClockState } from '../../../models/around-the-clock-state.interface';

export function checkTurnOver(state: AroundTheClockState): boolean {
  if (state.currentPlayerId === null) return false;

  const newThrowsCount = (state.participants[state.currentPlayerId]?.throws ?? 0) + 1;
  return newThrowsCount % throwsPerTurn === 0;
}

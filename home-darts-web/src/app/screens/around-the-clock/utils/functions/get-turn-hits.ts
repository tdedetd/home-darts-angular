import { throwsPerTurn } from '@constants/throws-per-turn';
import { TurnHits } from '../../models/turn-hits.type';

export function getTurnHits(turnHits: boolean[]): TurnHits {
  return turnHits.slice(0, throwsPerTurn) as TurnHits;
}

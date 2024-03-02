import { throwsPerTurn } from '@constants/throws-per-turn';
import { TurnHits } from '../../../models/turn-hits.type';

export function isPerfectTurn(turnHits: TurnHits): boolean {
  return turnHits.length === throwsPerTurn && turnHits.every(Boolean);
}

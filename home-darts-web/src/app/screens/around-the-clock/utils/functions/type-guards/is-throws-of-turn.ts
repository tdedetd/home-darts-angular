import { TurnHits } from '../../../models/turn-hits.type';

export function isThrowsOfTurn(value: boolean[]): value is TurnHits {
  return value.length >= 0 && value.length <= 3;
}

import { TurnHits } from './turn-hits.type';

export interface AtcParticipant {
  hits: number;
  throws: number;
  isCompleted: boolean;

  // TODO: rename to throwsOfTurn
  turnHits: TurnHits;
}

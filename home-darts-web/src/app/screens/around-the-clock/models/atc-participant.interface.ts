import { TurnHits } from './turn-hits.type';

export interface AtcParticipant {
  hits: number;
  throws: number;
  isCompleted: boolean;
  turnHits: TurnHits;
}

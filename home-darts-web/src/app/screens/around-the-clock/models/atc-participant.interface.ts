import { TurnThrows } from './turn-throws.type';

export interface AtcParticipant {
  hits: number;
  throws: number;
  isCompleted: boolean;
  turnThrows: TurnThrows;
}

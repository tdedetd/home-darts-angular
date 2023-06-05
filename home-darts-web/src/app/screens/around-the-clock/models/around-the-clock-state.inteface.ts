import { GameInfoApi } from '@models/game-info-api.interface';
import { AroundTheClockParams } from './around-the-clock-params.interface';

export interface AroundTheClockState {
  gameInfo: GameInfoApi<AroundTheClockParams> | null;
  sections: number[];
}

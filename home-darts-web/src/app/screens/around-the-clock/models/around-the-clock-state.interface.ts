import { GameInfoApi } from '@models/game-info-api.interface';
import { AroundTheClockParams } from './around-the-clock-params.interface';
import { GameLoadingStatuses } from '@models/game-loading-statuses.enum';
import { AtcParticipants } from './atc-participants.type';

export interface AroundTheClockState {
  currentPlayerId: number | null;
  gameInfo: GameInfoApi<AroundTheClockParams> | null;
  loading: boolean;
  loadingStatus: GameLoadingStatuses,
  participants: AtcParticipants;
  sections: number[];
}

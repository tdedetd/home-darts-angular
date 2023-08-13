import { GameInfoApi } from '@models/game-info-api.interface';
import { AroundTheClockParams } from './around-the-clock-params.interface';
import { GameLoadingStatuses } from '@models/game-loading-statuses.enum';
import { PlayerApi } from '@models/player-api.interface';
import { AtcParticipant } from './atc-participant.interface';

export interface AroundTheClockState {
  currentPlayerId: number | null;
  gameInfo: GameInfoApi<AroundTheClockParams> | null;
  loading: boolean;
  loadingStatus: GameLoadingStatuses,
  participants: Partial<Record<PlayerApi['id'], AtcParticipant>>;
  sections: number[];
}

import { PlayerApi } from '@models/player-api.interface';
import { AtcParticipant } from './atc-participant.interface';

export type AtcParticipants = Record<PlayerApi['id'], AtcParticipant>;

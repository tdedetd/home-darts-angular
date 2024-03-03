import { PlayerApi } from '@models/player-api.interface';
import { ThrowsGrouped } from '@models/throws-grouped.interface';
import { AtcParticipants } from '../../../models/atc-participants.type';
import { AtcParticipant } from '../../../models/atc-participant.interface';
import { getIsCompleted } from './get-is-completed';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { ThrowApi } from '@models/throw-api.interface';
import { throwsPerTurn } from '@constants/throws-per-turn';
import { getTurnHits } from '../../../utils/functions/type-guards/get-turn-hits';

export function getInitialParticipants(
  players: PlayerApi[],
  throwsGroupedList: ThrowsGrouped[],
  sectors: DartboardSector[],
  currentPlayerId: PlayerApi['id'] | null,
  lastThrowsByPlayers: Record<PlayerApi['id'], ThrowApi[]>
): AtcParticipants {
  const participantsList: [PlayerApi['id'], AtcParticipant][] = players.map(player => {
    const throwsGrouped = throwsGroupedList.find(throws => throws.playerId === player.id);
    if (!throwsGrouped) {
      return [
        player.id,
        {
          hits: 0,
          isCompleted: false,
          throws: 0,
          turnHits: [],
        }
      ];
    }

    const throwsCountOnTurn = throwsGrouped.throws % throwsPerTurn || throwsPerTurn;
    const lastThrows = lastThrowsByPlayers[player.id].slice(0, throwsCountOnTurn).map(({ hit }) => hit);
    return [
      player.id,
      {
        hits: throwsGrouped.hits,
        isCompleted: getIsCompleted(throwsGrouped.hits, sectors),
        throws: throwsGrouped.throws,
        turnHits: (player.id === currentPlayerId && throwsCountOnTurn === throwsPerTurn) ? [] : getTurnHits([...lastThrows].reverse()),
      }
    ];
  });

  return Object.fromEntries(participantsList);
}

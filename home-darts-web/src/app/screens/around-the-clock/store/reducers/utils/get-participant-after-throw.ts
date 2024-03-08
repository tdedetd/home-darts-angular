import { throwsPerTurn } from '@constants/throws-per-turn';
import { AtcParticipant } from '../../../models/atc-participant.interface';
import { getIsCompleted } from './get-is-completed';

export function getParticipantAfterThrow(
  sectors: number[],
  hit: boolean,
  participant: AtcParticipant,
): AtcParticipant {
  const hits = participant.hits + Number(hit);
  const turnHits = participant.turnHits;

  return {
    hits,
    throws: participant.throws + 1,
    isCompleted: getIsCompleted(hits, sectors),
    turnHits: turnHits.length !== throwsPerTurn
      ? [...turnHits, hit]
      : turnHits,
  };
}

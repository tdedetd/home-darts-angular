import { AtcParticipant } from '../../../models/atc-participant.interface';

export const getParticipantAfterThrow = (
  sectors: number[],
  hit: boolean,
  undo: boolean,
  participant?: AtcParticipant,
): AtcParticipant => {
  const throws = participant ? (participant.throws + (undo ? -1 : 1)) : 1;
  const hits = participant ? (participant.hits + (undo ? -Number(hit) : Number(hit))) : Number(hit);
  const isCompleted = hits >= sectors.length;
  return {
    throws, hits, isCompleted,
    turnThrows: participant?.turnThrows ?? []
  };
};

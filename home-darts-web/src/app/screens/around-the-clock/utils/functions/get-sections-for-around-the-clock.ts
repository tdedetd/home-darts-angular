import { GameDirections } from '../../models/game-directions.enum';
import { bullSection } from '@constants/bull-section';
import { sectionsInOrder } from '@constants/sections-in-order';
import { sectionsClockwise } from '@constants/sections-clockwise';
import { DartboardSector } from '@models/types/dartboard-sector.type';

const sectionsWithoutBullStrategy: Record<GameDirections, DartboardSector[]> = {
  [GameDirections.Backward]: [...sectionsInOrder].reverse(),
  [GameDirections.Forward]: [...sectionsInOrder],
  [GameDirections.ForwardBackward]: [...sectionsInOrder, ...[...sectionsInOrder].reverse().slice(1)],
  [GameDirections.Clockwise]: [...sectionsClockwise],
  [GameDirections.CounterClockwise]: [...sectionsClockwise].reverse(),
};

const sectionsWithBullStrategy: Record<GameDirections, DartboardSector[]> = {
  [GameDirections.Backward]: [bullSection, ...[...sectionsInOrder].reverse()],
  [GameDirections.Forward]: [...sectionsInOrder, bullSection],
  [GameDirections.ForwardBackward]: [...sectionsInOrder, bullSection, ...[...sectionsInOrder].reverse()],
  [GameDirections.Clockwise]: [...sectionsClockwise, bullSection],
  [GameDirections.CounterClockwise]: [bullSection, ...[...sectionsClockwise].reverse()],
};

export const getSectionsForAroundTheClock = (direction: GameDirections, includeBull: boolean): DartboardSector[] => {
  return includeBull ? sectionsWithBullStrategy[direction] : sectionsWithoutBullStrategy[direction];
};

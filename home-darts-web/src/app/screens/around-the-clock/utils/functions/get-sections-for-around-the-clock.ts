import { GameDirections } from '../../models/game-directions.enum';
import { bullSection } from '@constants/bull-section';
import { sectionsInOrder } from '@constants/sections-in-order';
import { sectionsClockwise } from '@constants/sections-clockwise';

const sectionsWithoutBullStrategy: Record<GameDirections, number[]> = {
  [GameDirections.Backward]: [...sectionsInOrder].reverse(),
  [GameDirections.Forward]: [...sectionsInOrder],
  [GameDirections.ForwardBackward]: [...sectionsInOrder, ...[...sectionsInOrder].reverse().slice(1)],
  [GameDirections.Clockwise]: [...sectionsClockwise],
  [GameDirections.CounterClockwise]: [...sectionsClockwise].reverse(),
};

const sectionsWithBullStrategy: Record<GameDirections, number[]> = {
  [GameDirections.Backward]: [bullSection, ...[...sectionsInOrder].reverse()],
  [GameDirections.Forward]: [...sectionsInOrder, bullSection],
  [GameDirections.ForwardBackward]: [...sectionsInOrder, bullSection, ...[...sectionsInOrder].reverse()],
  [GameDirections.Clockwise]: [...sectionsClockwise, bullSection],
  [GameDirections.CounterClockwise]: [bullSection, ...[...sectionsClockwise].reverse()],
};

export const getSectionsForAroundTheClock = (direction: GameDirections, includeBull: boolean): number[] => {
  return includeBull ? sectionsWithBullStrategy[direction] : sectionsWithoutBullStrategy[direction];
};

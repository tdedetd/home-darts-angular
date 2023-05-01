import { GameDirections } from 'src/app/models/game-directions.enum';

const sectionsCommon = Array(20).fill(null).map((_, index) => index + 1);
const sectionBull = 25;

const sectionsWithoutBullStrategy: Record<GameDirections, number[]> = {
  [GameDirections.Backward]: [...sectionsCommon].reverse(),
  [GameDirections.Forward]: [...sectionsCommon],
  [GameDirections.ForwardBackward]: [...sectionsCommon, ...[...sectionsCommon].reverse().slice(1)],
};

const sectionsWithBullStrategy: Record<GameDirections, number[]> = {
  [GameDirections.Backward]: [sectionBull, ...[...sectionsCommon].reverse()],
  [GameDirections.Forward]: [...sectionsCommon, sectionBull],
  [GameDirections.ForwardBackward]: [...sectionsCommon, sectionBull, ...[...sectionsCommon].reverse()],
};

export const getSectionsForAroundTheClock = (direction: GameDirections, includeBull: boolean): number[] => {
  return includeBull ? sectionsWithBullStrategy[direction] : sectionsWithoutBullStrategy[direction];
};

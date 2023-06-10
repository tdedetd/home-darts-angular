import { GameDirections } from '../../models/game-directions.enum';

interface GameDirectionItem {
  name: string;
  value: GameDirections;
}

export const gameDirectionItems: GameDirectionItem[] = [
  {
    name: 'Forward',
    value: GameDirections.Forward,
  },
  {
    name: 'Backward',
    value: GameDirections.Backward,
  },
  {
    name: 'Forward and backward',
    value: GameDirections.ForwardBackward,
  },
  {
    name: 'Clockwise',
    value: GameDirections.Clockwise,
  },
  {
    name: 'Counter clockwise',
    value: GameDirections.CounterClockwise,
  },
];

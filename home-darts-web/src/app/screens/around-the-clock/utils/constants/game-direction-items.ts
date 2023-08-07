import { Item } from '@models/item.interface';
import { GameDirections } from '../../models/game-directions.enum';

export const gameDirectionItems: Item<GameDirections>[] = [
  {
    label: 'Forward',
    value: GameDirections.Forward,
  },
  {
    label: 'Backward',
    value: GameDirections.Backward,
  },
  {
    label: 'Forward and backward',
    value: GameDirections.ForwardBackward,
  },
  {
    label: 'Clockwise',
    value: GameDirections.Clockwise,
  },
  {
    label: 'Counter clockwise',
    value: GameDirections.CounterClockwise,
  },
];

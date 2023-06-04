import { GameParamTypes } from '../types/game-param-types.enum';
import { GameParamValue } from '../types/game-param-value.type';
import { Gamemodes } from '../types/gamemodes.enum';
import { Player } from './player.interface';

export interface GameInfo {
  id: number;
  creationDate: string;
  gamemodeName: Gamemodes;
  isCompleted: boolean;
  params: Partial<Record<GameParamTypes, GameParamValue>>;
  players: Player[];
};

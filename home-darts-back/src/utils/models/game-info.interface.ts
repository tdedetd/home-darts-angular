import { GameParamTypes } from '../types/game-param-types.enum.js';
import { GameParamValue } from '../types/game-param-value.type.js';
import { Gamemodes } from '../types/gamemodes.enum.js';
import { Player } from './player.interface.js';

export interface GameInfo {
  id: number;
  creationDate: string;
  gamemodeName: Gamemodes;
  isCompleted: boolean;
  params: Partial<Record<GameParamTypes, GameParamValue>>;
  players: Player[];
};

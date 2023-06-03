import { GameParamTypes } from '../types/game-param-types.enum';
import { Gamemodes } from '../types/gamemodes.enum';
import { Player } from './player.interface';

export interface GameInfo {
  id: number;
  creationDate: string;
  gamemodeName: Gamemodes;
  params: Partial<Record<GameParamTypes, string>>;
  players: Player[];
};

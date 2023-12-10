import { GameParamTypes } from './enums/game-param-types.enum';
import { Gamemodes } from './enums/gamemodes.enum';
import { PlayerApi } from './player-api.interface';

export interface GameInfoApi<GameParams extends object = Partial<Record<GameParamTypes, unknown>>> {
  id: number;
  creationDate: string;
  gamemodeName: Gamemodes;
  isCompleted: boolean;
  params: GameParams;
  players: PlayerApi[];
}

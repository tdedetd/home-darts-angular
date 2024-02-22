import { GameParamDatatype } from '../types/game-param-datatype.enum.js';

export interface GameParam {
  name: string;
  value: string;
  datatype: GameParamDatatype;
}

import { GameParamDatatype } from '../types/game-param-datatype.enum';

export interface GameParam {
  name: string;
  value: string;
  datatype: GameParamDatatype;
}

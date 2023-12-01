import { Gamemodes } from '@models/enums/gamemodes.enum';

export interface HistoryApi {
  id: number;
  creationDate: string;
  gamemodeName: Gamemodes;
  isCompleted: boolean;
  throws: number;
  hits: number;
}

import { Gamemodes } from '../types/gamemodes.enum.js';

export interface History {
  id: number;
  creationDate: string;
  gamemodeName: Gamemodes;
  isCompleted: boolean;
  throws: number;
  hits: number;
}

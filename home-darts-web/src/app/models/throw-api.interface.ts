export interface ThrowApi {
  id: number;
  creationDate: string;
  gameId: number;
  playerId: number;
  hit: boolean;
  nominal: number;
  multiplier: 1 | 2 | 3;
}

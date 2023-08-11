import { ThrowsHits } from './throws-hits.interface.js';

export interface PlayerStats {
  gamesCount: number;
  throwsCount: number;
  totalPlayingTimeSeconds: number;
  aroundTheClock: ThrowsHits;
}

import { SectionTypes } from '../types/section-types.enum.js';
import { ThrowsHits } from './throws-hits.interface.js';

export interface PlayerStats {
  gamesCount: number;
  throwsCount: number;
  totalPlayingTimeSeconds: number;
  aroundTheClock: {
    throwsHits: ({ sectionType: SectionTypes } & ThrowsHits)[];
    hitsStreak: { sectionType: SectionTypes, longestHitsStreak: number }[];
    gamesCount: { sectionType: SectionTypes, gamesCount: number }[];
  };
}

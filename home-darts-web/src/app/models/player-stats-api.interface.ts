import { SectionTypes } from './section-types.enum';

export interface PlayerStatsApi {
  gamesCount: number;
  throwsCount: number;
  totalPlayingTimeSeconds: number;
  aroundTheClock: {
    gamesCount: {
      gamesCount: number;
      sectionType: SectionTypes;
    }[],
    hitsStreak: {
      longestHitsStreak: number;
      sectionType: SectionTypes;
    }[],
    throwsHits: {
      sectionType: SectionTypes;
      throws: number;
      hits: number;
    }[],
  }
}

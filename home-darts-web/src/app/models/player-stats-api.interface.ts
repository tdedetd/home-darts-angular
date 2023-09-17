import { SectionTypes } from './section-types.enum';

export interface PlayerStatsApi {
  gamesCount: number;
  throwsCount: number;
  totalPlayingTimeSeconds: number;
  aroundTheClock: {

    /** @deprecated */
    throws: number;

    /** @deprecated */
    hits: number;

    /** @deprecated */
    longestHitsStreak: number;

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

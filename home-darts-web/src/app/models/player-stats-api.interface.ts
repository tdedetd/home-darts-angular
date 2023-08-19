export interface PlayerStatsApi {
  gamesCount: number;
  throwsCount: number;
  totalPlayingTimeSeconds: number;
  aroundTheClock: {
    throws: number;
    hits: number;
    longestHitsStreak: number;
  }
}

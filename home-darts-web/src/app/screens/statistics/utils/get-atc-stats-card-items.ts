import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { sectionTypesItems } from '@constants/section-type-items';
import { AtcStatisticsCardData } from '../models/atc-statistics-card-data.interface';

export function getAtcStatsCardItems(stats: PlayerStatsApi['aroundTheClock']): AtcStatisticsCardData[] {
  const cards: AtcStatisticsCardData[] = sectionTypesItems.map<AtcStatisticsCardData>(sectionTypeItem => {
    const throwsHitsRecord = stats.throwsHits.find(({ sectionType }) => sectionTypeItem.value === sectionType);
    return {
      gamesCount: stats.gamesCount.find(({ sectionType }) => sectionTypeItem.value === sectionType)?.gamesCount ?? 0,
      throws: throwsHitsRecord?.throws ?? 0,
      hits: throwsHitsRecord?.hits ?? 0,
      longestHitsStreak: stats.hitsStreak.find(
        ({ sectionType }) => sectionTypeItem.value === sectionType
      )?.longestHitsStreak ?? 0,
    }
  });

  const allCard: AtcStatisticsCardData = {
    gamesCount: cards.reduce((acc, { gamesCount }) => acc + gamesCount, 0),
    throws: cards.reduce((acc, { throws }) => acc + throws, 0),
    hits: cards.reduce((acc, { hits }) => acc + hits, 0),
    longestHitsStreak: Math.max(...cards.map(({ longestHitsStreak }) => longestHitsStreak)),
  };
  return [allCard, ...cards];
}

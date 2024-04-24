import { PlayerStatsApi } from '../../../models/player-stats-api.interface';
import { sectionTypesItems } from '@constants/section-type-items';
import { AtcStatisticsCard } from '../components/atc-statistics-card/models/atc-statistics-card.interface';

export function getAtcStatsCardItems(stats: PlayerStatsApi['aroundTheClock']): AtcStatisticsCard[] {
  const cards: AtcStatisticsCard[] = sectionTypesItems.map(sectionTypeItem => {
    const throwsHitsRecord = stats.throwsHits.find(({ sectionType }) => sectionTypeItem.value === sectionType);
    return {
      title: sectionTypeItem.label,
      gamesCount: stats.gamesCount.find(({ sectionType }) => sectionTypeItem.value === sectionType)?.gamesCount ?? 0,
      throws: throwsHitsRecord?.throws ?? 0,
      hits: throwsHitsRecord?.hits ?? 0,
      longestHitsStreak: stats.hitsStreak.find(
        ({ sectionType }) => sectionTypeItem.value === sectionType
      )?.longestHitsStreak ?? 0,
    }
  });

  const allCard: AtcStatisticsCard = {
    title: 'All',
    gamesCount: cards.reduce((acc, { gamesCount }) => acc + gamesCount, 0),
    throws: cards.reduce((acc, { throws }) => acc + throws, 0),
    hits: cards.reduce((acc, { hits }) => acc + hits, 0),
    longestHitsStreak: Math.max(...cards.map(({ longestHitsStreak }) => longestHitsStreak)),
  };
  return [allCard, ...cards];
}

import { MockMeta } from '../models/mock-meta.interface';
import { getMockGamesHistory } from '../utils/get-mock-games-history';

import throws from './mocks/throws.json';
import atcGameDetail from './mocks/atc-game-detail.json';
import atcGameThrowsGrouped from './mocks/atc-game-throws-grouped.json';
import atcStart from './mocks/atc-start.json';
import atcHitRate from './mocks/atc-hit-rate.json';
import players from './mocks/players.json';
import playerStats from './mocks/player-stats.json';

export const mocksConfig: MockMeta[] = [
  { regex: /api\/players\/?$/, data: players, delay: 100 },
  { regex: /api\/players\/\d+\/stats$/, data: playerStats, delay: 100 },
  { regex: /api\/throws\/\d+$/, data: throws, delay: 300 },
  { regex: /api\/throws\/grouped\/\d+$/, data: atcGameThrowsGrouped, delay: 300 },
  { regex: /api\/history\/?$/, data: getMockGamesHistory, delay: 200 },
  { regex: /api\/games\/\d+$/, data: atcGameDetail, delay: 200 },
  { regex: /api\/games\/around-the-clock\/start$/, data: atcStart, delay: 1000 },
  { regex: /api\/games\/around-the-clock\/\d+\/throw$/, delay: 100 },
  { regex: /api\/games\/around-the-clock\/\d+\/undo$/, delay: 100 },
  { regex: /api\/games\/around-the-clock\/hit-rate$/, data: atcHitRate, delay: 100 },
];

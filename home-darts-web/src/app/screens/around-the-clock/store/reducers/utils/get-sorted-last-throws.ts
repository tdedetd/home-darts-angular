import { PlayerApi } from '@models/player-api.interface';
import { ThrowApi } from '@models/throw-api.interface';
import { flatObjectValues } from '@functions/flat-object-values';
import { sortItemsByDate } from '@functions/sort-items-by-date';

export function getSortedLastThrows(lastThrowsByPlayers: Record<PlayerApi['id'], ThrowApi[]>): ThrowApi[] {
  const lastThrows = flatObjectValues(lastThrowsByPlayers);
  return sortItemsByDate(lastThrows, 'creationDate', 'desc');
}

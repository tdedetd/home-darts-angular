import { FilteredKeysByType } from '@models/types/filtered-keys-by-type.type';

type DateType = string | Date;

export function sortItemsByDate<T extends object>(
  items: T[],
  key: FilteredKeysByType<T, DateType>,
  direction: 'asc' | 'desc'
): T[] {
  return direction === 'asc'
    ? items.sort((item1, item2) => getDateMs(item1[key]) - getDateMs(item2[key]))
    : items.sort((item1, item2) => getDateMs(item2[key]) - getDateMs(item1[key]));
}

function getDateMs<T extends object>(date: T[FilteredKeysByType<T, DateType>]): number {
  return typeof date === 'string'
    ? new Date(date).getTime()
    : date instanceof Date
      ? date.getTime()
      : 0;
}

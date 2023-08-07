import { Item } from '@models/item.interface';
import { SectionTypes } from '@models/section-types.enum';

export const sectionTypes: Item<SectionTypes>[] = [
  { label: 'Any', value: SectionTypes.Any },
  { label: 'Double', value: SectionTypes.Double },
  { label: 'Triple', value: SectionTypes.Triple },
];

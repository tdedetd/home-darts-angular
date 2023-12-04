import { DartboardStyles } from '@models/enums/dartboard-styles.enum';
import { Item } from '@models/item.interface';

export const dartboardStyleItems: Item<DartboardStyles>[] = [
  { label: 'Material', value: DartboardStyles.Material },
  { label: 'Classic', value: DartboardStyles.Classic },
];

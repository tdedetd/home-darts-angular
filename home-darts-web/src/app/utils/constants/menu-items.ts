import { MenuItem } from '@models/menu-item.interface';
import { MaterialIcons } from '@models/enums/material-icons.enum';

export const menuItems: MenuItem[] = [
  { icon: MaterialIcons.Schedule, link: './around-the-clock', name: 'Around the Clock' },
  { icon: MaterialIcons.History, link: './history', name: 'History' },
  { icon: MaterialIcons.BarChart, link: './statistics', name: 'Statistics' },
];

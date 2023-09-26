import { ChangeDetectionStrategy, Component } from '@angular/core';

interface MenuItem {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'hd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  public readonly menuItems: MenuItem[] = [
    { icon: 'schedule', link: './around-the-clock', name: 'Around the Clock' },
    { icon: 'history', link: './history', name: 'History' },
    { icon: 'bar_chart', link: './statistics', name: 'Statistics' },
  ];
}

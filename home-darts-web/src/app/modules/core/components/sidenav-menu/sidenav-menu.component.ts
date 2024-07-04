import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MenuItem } from '@models/menu-item.interface';
import { menuItems } from '@constants/menu-items';

@Component({
  selector: 'hd-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavMenuComponent {
  public menuItemClick = output();

  public readonly menuItems: MenuItem[] = menuItems;

  public onItemClick(): void {
    this.menuItemClick.emit();
  }
}

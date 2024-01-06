import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from '@models/menu-item.interface';
import { menuItems } from '@constants/menu-items';

@Component({
  selector: 'hd-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavMenuComponent {
  @Output() public menuItemClick = new EventEmitter<void>();

  public readonly menuItems: MenuItem[] = menuItems;

  public onItemClick(): void {
    this.menuItemClick.emit();
  }
}

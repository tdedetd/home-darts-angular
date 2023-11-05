import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '@models/menu-item.interface';
import { menuItems } from '@constants/menu-items';

@Component({
  selector: 'hd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly menuItems: MenuItem[] = menuItems;
}

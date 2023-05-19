import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HistoryApi } from '../../models/history-api.interface';
import { gamemodesNames } from '@constants/gamemodes-names';

@Component({
  selector: 'hd-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryItemComponent {
  @Input() public data?: HistoryApi;
  public readonly gamemodesNames = gamemodesNames;
}

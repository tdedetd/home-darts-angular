import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HistoryApi } from '../../models/history-api.interface';
import { gamemodesNames } from '@constants/gamemodes-names';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hd-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryItemComponent {
  public data = input.required<HistoryApi>();
  public elementFocus = output<HTMLElement>();

  public readonly gamemodesNames = gamemodesNames;
  public dateNow = new Date();

  constructor(public route: ActivatedRoute) { }

  public onFocus(event: Event): void {
    if (event.target && event.target instanceof HTMLElement) {
      this.elementFocus.emit(event.target);
    }
  }
}

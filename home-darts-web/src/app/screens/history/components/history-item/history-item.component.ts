import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() public data?: HistoryApi;
  @Output() public elementFocus = new EventEmitter<HTMLElement>();

  public readonly gamemodesNames = gamemodesNames;
  public dateNow = new Date();

  constructor(public route: ActivatedRoute) { }

  public onFocus(event: Event): void {
    if (event.target && event.target instanceof HTMLElement) {
      this.elementFocus.emit(event.target);
    }
  }
}

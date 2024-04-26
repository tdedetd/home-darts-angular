import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { AtcStatisticsCardData } from '../../models/atc-statistics-card-data.interface';

@Component({
  selector: 'hd-atc-statistics-card',
  templateUrl: './atc-statistics-card.component.html',
  styleUrl: './atc-statistics-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStatisticsCardComponent {
  @Input() public data?: AtcStatisticsCardData;

  public title = input.required<string>();
}

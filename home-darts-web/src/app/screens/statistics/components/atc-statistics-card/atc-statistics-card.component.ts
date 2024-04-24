import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AtcStatisticsCard } from './models/atc-statistics-card.interface';

@Component({
  selector: 'hd-atc-statistics-card',
  templateUrl: './atc-statistics-card.component.html',
  styleUrl: './atc-statistics-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStatisticsCardComponent {
  public data = input.required<AtcStatisticsCard>();
}

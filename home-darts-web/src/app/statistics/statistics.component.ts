import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hd-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent { }

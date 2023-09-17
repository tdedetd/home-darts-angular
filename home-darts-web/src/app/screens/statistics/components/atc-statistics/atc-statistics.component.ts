import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerStatsApi } from '../../../../models/player-stats-api.interface';
import { sectionTypesItems } from '@constants/section-type-items';

@Component({
  selector: 'hd-atc-statistics',
  templateUrl: './atc-statistics.component.html',
  styleUrls: ['./atc-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStatisticsComponent {
  @Input() public stats?: PlayerStatsApi['aroundTheClock'];

  public readonly sectionTypesItems = sectionTypesItems;
}

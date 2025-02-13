import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { HitRate } from '../../models/hit-rate.interface';
import { sectionTypesItems } from '@constants/section-type-items';
import { Store } from '@ngrx/store';
import { selectAtcStatisticsData } from '../../store/selectors/atc-statistics-data.selector';
import { UntilDestroy } from '@ngneat/until-destroy';
import { selectAtcHitRate } from '../../store/selectors/atc-hit-rate.selector';

@UntilDestroy()
@Component({
  selector: 'hd-atc-statistics',
  templateUrl: './atc-statistics.component.html',
  styleUrls: ['./atc-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStatisticsComponent {
  public readonly cardTitles: string[] = ['All', ...sectionTypesItems.map(({ label }) => label)];
  public hitRate$: Observable<HitRate[]> = this.store.select(selectAtcHitRate).pipe(filter(Boolean));
  public stats = this.store.selectSignal(selectAtcStatisticsData);

  constructor(private store: Store) { }

  public ngOnInit(): void {
  }
}

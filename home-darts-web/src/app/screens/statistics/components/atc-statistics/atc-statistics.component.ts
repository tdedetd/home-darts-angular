import { ChangeDetectionStrategy, Component, Input, OnInit, computed, input } from '@angular/core';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { PlayerApi } from '@models/player-api.interface';
import { StatisticsApiService } from '../../services/statistics-api.service';
import { Observable, ReplaySubject, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { SectionTypes } from '@models/enums/section-types.enum';
import { isNotEmpty } from '@functions/type-guards/is-not-empty';
import { HitRate } from '../../models/hit-rate.interface';
import { AtcStatisticsCard } from '../atc-statistics-card/models/atc-statistics-card.interface';
import { getAtcStatsCardItems } from '../../utils/get-atc-stats-card-items';

@Component({
  selector: 'hd-atc-statistics',
  templateUrl: './atc-statistics.component.html',
  styleUrls: ['./atc-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStatisticsComponent implements OnInit {
  @Input() public set playerId(value: PlayerApi['id'] | null) {
    this.playerIdSubject.next(value);
  }

  public stats = input.required<PlayerStatsApi['aroundTheClock']>();
  public statsCards = computed<AtcStatisticsCard[]>(() => {
    const stats = this.stats();
    return getAtcStatsCardItems(stats);
  });

  public hitRate$?: Observable<HitRate[]>;

  private playerIdSubject = new ReplaySubject<PlayerApi['id'] | null>(1);

  constructor(private statisticsApi: StatisticsApiService) { }

  public ngOnInit(): void {
    this.hitRate$ = this.getHitRate();
  }

  private getHitRate(): Observable<HitRate[]> {
    return this.playerIdSubject.pipe(
      filter((playerId): playerId is PlayerApi['id'] => isNotEmpty(playerId)),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap((playerId) => {
        return this.statisticsApi.hitRate(playerId, { hitDetection: SectionTypes.Any });
      }),
    );
  }
}

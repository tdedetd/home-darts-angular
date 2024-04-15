import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { sectionTypesItems } from '@constants/section-type-items';
import { PlayerApi } from '@models/player-api.interface';
import { StatisticsApiService } from '../../services/statistics-api.service';
import { Observable, ReplaySubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { SectionTypes } from '@models/enums/section-types.enum';
import { isNotEmpty } from '@functions/type-guards/is-not-empty';
import { HitRate } from '../../models/hit-rate.interface';
import { DartboardStyle } from '@modules/dartboard/models/dartboard-style.interface';
import { materialStyle } from '@modules/dartboard/constants/styles/material-style';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { mixColors } from '@functions/mix-colors';
import { accentBlueColor } from '@constants/colors/accent-blue-color';
import { lightBlueColor } from '@constants/colors/light-blue-color';

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

  @Input() public stats?: PlayerStatsApi['aroundTheClock'];

  public hitRateDartboardStyle: DartboardStyle | null = null;
  public hitRate$?: Observable<HitRate[]>;
  public readonly sectionTypesItems = sectionTypesItems;

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
      tap((hitRateRecords) => {
        const hitRates = hitRateRecords
          .filter(({ sector }) => sector !== 25)
          .map(({ hits, throws }) => hits / throws);

        const maxHitRate = Math.max(...hitRates);
        const minHitRate = Math.min(...hitRates);

        const sectorColors: { sector: DartboardSector, color: string }[] = hitRateRecords.map((record) => {
          const hitRate = record.hits / record.throws;
          const amount = (hitRate - minHitRate) / (maxHitRate - minHitRate);
          const color = mixColors(accentBlueColor, lightBlueColor, amount);
          return {
            color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            sector: record.sector,
          };
        });
        this.hitRateDartboardStyle = {
          ...materialStyle,
          sectorColors
        };
      }),
    );
  }
}

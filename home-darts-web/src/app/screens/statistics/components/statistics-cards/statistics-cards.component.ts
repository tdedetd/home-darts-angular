import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnimationOptions } from '@features/animation/models/animation-options.interface';
import { TimingFunctions } from '@features/animation/models/timing-functions.enum';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { Store } from '@ngrx/store';
import { AnimatedPipeCallback } from '@features/animation/models/animated-pipe-callback.type';
import { selectStatisticsData } from '../../store/selectors/statistics-data.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIsCountersAnimationsOn } from '../../../../store/selectors/is-counters-animations-on.selector';
import { take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'hd-statistics-cards',
  templateUrl: './statistics-cards.component.html',
  styleUrl: './statistics-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsCardsComponent implements OnInit {
  public isCounterAnimationsOn: boolean | null = null;

  public stats?: PlayerStatsApi | null;

  public readonly animationOptions: AnimationOptions = {
    durationMs: 1000,
    refreshTimeout: 10,
    timingFunction: TimingFunctions.EaseOutQuartic,
  };

  constructor(private cdr: ChangeDetectorRef, private store: Store) { }

  public ngOnInit(): void {
    this.initStatsUpdating();
    this.loadIsCounterAnimationsOn();
  }

  public animationPipeCallback: AnimatedPipeCallback<number> = (value, phase) => Math.round(value * phase);

  private initStatsUpdating(): void {
    this.store.select(selectStatisticsData).pipe(untilDestroyed(this)).subscribe((stats) => {
      this.stats = stats;
      this.cdr.detectChanges();
    });
  }

  private loadIsCounterAnimationsOn(): void {
    this.store.select(selectIsCountersAnimationsOn).pipe(
      take(1),
      untilDestroyed(this)
    ).subscribe(isCounterAnimationsOn => {
      this.isCounterAnimationsOn = isCounterAnimationsOn;
      this.cdr.detectChanges();
    });
  }
}

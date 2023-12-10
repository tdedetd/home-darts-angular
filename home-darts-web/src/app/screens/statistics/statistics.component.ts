import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, switchMap } from 'rxjs';
import { PlayerApi } from '@models/player-api.interface';
import { PlayerApiService } from '../../services/player-api.service';
import { AnimatedPipeCallback } from '../../modules/animation/models/animated-pipe-callback.type';
import { AnimationOptions } from '../../modules/animation/models/animation-options.interface';
import { TimingFunctions } from '../../modules/animation/models/timing-functions.enum';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIsCountersAnimationsOn } from '../../store/selectors/is-counters-animations-on.selector';

@UntilDestroy()
@Component({
  selector: 'hd-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  public readonly players$: Observable<PlayerApi[]> = this.playerApi.getPlayers();
  public readonly playerControl = new FormControl<PlayerApi | null>(null);

  public isCounterAnimationsOn: boolean | null = null;

  public readonly stats$ = this.playerControl.valueChanges.pipe(
    filter(Boolean),
    switchMap(player => this.playerApi.getPlayerStats(player.id)),
  );

  public readonly animationOptions: AnimationOptions = {
    durationMs: 1000,
    refreshTimeout: 10,
    timingFunction: TimingFunctions.EaseOutQuartic,
  };

  constructor(
    private playerApi: PlayerApiService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.store.select(selectIsCountersAnimationsOn).pipe(
      untilDestroyed(this)
    ).subscribe(isCounterAnimationsOn => {
      this.isCounterAnimationsOn = isCounterAnimationsOn;
      this.cdr.detectChanges();
    });
  }

  public animationPipeCallback: AnimatedPipeCallback<number> = (value, phase) => Math.round(value * phase);
}

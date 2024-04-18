import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, filter, switchMap, tap } from 'rxjs';
import { PlayerApi } from '@models/player-api.interface';
import { PlayerApiService } from '../../services/player-api.service';
import { AnimatedPipeCallback } from '@modules/animation/models/animated-pipe-callback.type';
import { AnimationOptions } from '@modules/animation/models/animation-options.interface';
import { TimingFunctions } from '@modules/animation/models/timing-functions.enum';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIsCountersAnimationsOn } from '../../store/selectors/is-counters-animations-on.selector';
import { DefaultPlayerService } from '../../services/default-player.service';
import { PlayerStatsApi } from '@models/player-stats-api.interface';

@UntilDestroy()
@Component({
  selector: 'hd-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  public readonly players$: Observable<PlayerApi[]> = this.playerApi.getPlayers().pipe(
    tap(players => this.selectDefaultPlayer(players))
  );
  public readonly playerControl = new FormControl<PlayerApi | null>(null);

  public isCounterAnimationsOn: boolean | null = null;

  public stats?: PlayerStatsApi;

  public readonly animationOptions: AnimationOptions = {
    durationMs: 1000,
    refreshTimeout: 10,
    timingFunction: TimingFunctions.EaseOutQuartic,
  };

  public get playerId(): PlayerApi['id'] | null {
    return this.playerControl.getRawValue()?.id ?? null;
  }

  constructor(
    private playerApi: PlayerApiService,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private defaultPlayer: DefaultPlayerService,
  ) { }

  public ngOnInit(): void {
    this.store.select(selectIsCountersAnimationsOn).pipe(
      untilDestroyed(this)
    ).subscribe(isCounterAnimationsOn => {
      this.isCounterAnimationsOn = isCounterAnimationsOn;
      this.cdr.detectChanges();
    });

    this.initStatsUpdating();
  }

  public animationPipeCallback: AnimatedPipeCallback<number> = (value, phase) => Math.round(value * phase);

  private initStatsUpdating(): void {
    this.playerControl.valueChanges.pipe(
      filter(Boolean),
      debounceTime(250),
      tap(player => this.defaultPlayer.save(player.id)),
      switchMap(player => this.playerApi.getPlayerStats(player.id)),
      untilDestroyed(this),
    ).subscribe((stats) => {
      this.stats = stats;
      this.cdr.detectChanges();
    });
  }

  private selectDefaultPlayer(players: PlayerApi[]): void {
    const playerId = this.defaultPlayer.load();
    const player = players.find(({ id }) => id === playerId);
    if (player) {
      this.playerControl.setValue(player);
    }
  }
}

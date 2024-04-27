import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter } from 'rxjs';
import { PlayerApi } from '@models/player-api.interface';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { changePlayerSelectedStart, initStatistics, resetStatistics } from './store/actions/statistics.actions';
import { selectPlayers } from './store/selectors/players.selector';
import { selectPlayerSelected } from './store/selectors/player-selected.selector';
import { selectStatisticsData } from './store/selectors/statistics-data.selector';

@UntilDestroy()
@Component({
  selector: 'hd-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public readonly players$: Observable<PlayerApi[]> = this.store.select(selectPlayers);
  public readonly playerControl = new FormControl<PlayerApi | null>(null);

  public stats?: PlayerStatsApi | null;

  /** @deprecated */
  public get playerId(): PlayerApi['id'] | null {
    return this.playerControl.getRawValue()?.id ?? null;
  }

  constructor(private cdr: ChangeDetectorRef, private store: Store) { }

  public ngOnInit(): void {
    this.subscribeToChangePlayerFromControl();
    this.subscribeToChangePlayerFromStore();
    this.initStatsUpdating();

    this.store.dispatch(initStatistics());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(resetStatistics());
  }

  private initStatsUpdating(): void {
    this.store.select(selectStatisticsData).pipe(untilDestroyed(this)).subscribe((stats) => {
      this.stats = stats;
      this.cdr.detectChanges();
    });
  }

  private subscribeToChangePlayerFromControl(): void {
    this.playerControl.valueChanges.pipe(
      filter(Boolean),
      untilDestroyed(this),
    ).subscribe((player) => {
      this.store.dispatch(changePlayerSelectedStart({ playerId: player.id }));
    });
  }

  private subscribeToChangePlayerFromStore(): void {
    this.store.select(selectPlayerSelected).pipe(
      filter(Boolean),
      untilDestroyed(this)
    ).subscribe((player) => {
      this.playerControl.setValue(player, { emitEvent: false });
    });
  }
}

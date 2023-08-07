import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { startGameInfoLoading } from '../../../../store/actions/game-info.actions';
import { Observable, map } from 'rxjs';
import { selectPlayersState } from '../../store/selectors/players-state.selector';
import { AtcParticipant } from '../../models/atc-participant.interface';
import { PlayerApi } from '@models/player-api.interface';
import { selectCurrentPlayer } from '../../store/selectors/current-player.selector';
import { selectUpcomingSectorsForCurrentPlayer } from '../../store/selectors/upcoming-sectors-for-current-player.selector';
import { atcCompleteStart, atcResetGame, atcTrowStart, atcUndoStart } from '../../store/actions/around-the-clock.actions';
import { selectLoading } from '../../store/selectors/loading.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIsPlayerTurn } from '../../store/selectors/is-player-turn.selector';
import { selectCanCompleteGame } from '../../store/selectors/can-complete-game.selector';
import { selectIsGameCompleted } from '../../store/selectors/is-game-completed.selector';

@UntilDestroy()
@Component({
  selector: 'hd-atc-game',
  templateUrl: './atc-game.component.html',
  styleUrls: ['./atc-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameComponent implements OnInit, OnDestroy {
  public canCompleteGame$: Observable<boolean> = this.store.select(selectCanCompleteGame);
  public currentPlayer$: Observable<PlayerApi | null> = this.store.select(selectCurrentPlayer);
  public isGameNotCompleted$: Observable<boolean> = this.store.select(selectIsGameCompleted).pipe(map(completed => !completed));
  public loading = true;
  public players$: Observable<(AtcParticipant & PlayerApi)[]> = this.store.select(selectPlayersState);
  public upcomingSectors$: Observable<number[]> = this.store.select(selectUpcomingSectorsForCurrentPlayer);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ aroundTheClock: AroundTheClockState }>,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    const gameId = Number(this.activatedRoute.snapshot.paramMap.get('gameId'));
    this.store.dispatch(startGameInfoLoading({ gameId }));
    this.store.select(selectLoading).pipe(untilDestroyed(this)).subscribe(loading => {
      this.loading = loading;
      this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(atcResetGame());
  }

  public isPlayerActive(playerId: number): Observable<boolean> {
    return this.store.select(selectIsPlayerTurn(playerId));
  }

  public onCompleteClick(): void {
    this.store.dispatch(atcCompleteStart());
  }

  public throw(hit: boolean): void {
    this.store.dispatch(atcTrowStart({ hit }));
  }

  public undo(): void {
    this.store.dispatch(atcUndoStart());
  }
}

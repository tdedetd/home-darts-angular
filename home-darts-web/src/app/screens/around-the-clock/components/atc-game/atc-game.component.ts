import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { startGameInfoLoading } from '../../../../store/actions/game-info.actions';
import { Observable } from 'rxjs';
import { selectPlayersState } from '../../store/selectors/players-state.selector';
import { selectCurrentSectorForCurrentPlayer } from '../../store/selectors/current-sector-for-current-player.selector';
import { selectUpcomingSectorsForCurrentPlayer } from '../../store/selectors/upcoming-sectors-for-current-player.selector';
import { atcCompleteStart, atcResetGame, atcTrowStart, atcUndoStart } from '../../store/actions/around-the-clock.actions';
import { selectLoading } from '../../store/selectors/loading.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIsPlayerTurn } from '../../store/selectors/is-player-turn.selector';
import { selectCanCompleteGame } from '../../store/selectors/can-complete-game.selector';
import { selectIsCurrentPlayerCompleted } from '../../store/selectors/is-current-player-completed.selector';
import { selectTurnHits } from '../../store/selectors/turn-hits.selector';
import { TurnHits } from '../../models/turn-hits.type';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { selectDartboardSettings } from '../../store/selectors/dartboard-settings.selector';
import { selectIsGameCompleted } from '../../store/selectors/is-game-completed.selector';
import { selectInitStatusNoSuchGame } from '../../store/selectors/init-status-no-such-game.selector';
import { selectInitStatusUnexpectedError } from '../../store/selectors/init-status-unexpected-error.selector';
import { selectInitStatusInitiated } from '../../store/selectors/init-status-initiated.selector';

@UntilDestroy()
@Component({
  selector: 'hd-atc-game',
  templateUrl: './atc-game.component.html',
  styleUrls: ['./atc-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameComponent implements OnInit, OnDestroy {
  public readonly store = inject(Store);

  public initiated = this.store.selectSignal(selectInitStatusInitiated);
  public canCompleteGame = this.store.selectSignal(selectCanCompleteGame);
  public currentPlayerCompleted = this.store.selectSignal(selectIsCurrentPlayerCompleted);
  public isGameCompleted = this.store.selectSignal(selectIsGameCompleted);
  public loading = true;
  public players = this.store.selectSignal(selectPlayersState);
  public errorNoSuchGame = this.store.selectSignal(selectInitStatusNoSuchGame);
  public errorUnexpected = this.store.selectSignal(selectInitStatusUnexpectedError);
  public dartboardSettings = this.store.selectSignal(selectDartboardSettings);

  public selectCurrentSectorForCurrentPlayer$: Observable<DartboardSector | undefined> =
    this.store.select(selectCurrentSectorForCurrentPlayer);

  public upcomingSectors$: Observable<DartboardSector[]> = this.store.select(selectUpcomingSectorsForCurrentPlayer);

  constructor(
    private activatedRoute: ActivatedRoute,
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

  public getTurnHits(playerId: number): Signal<TurnHits> {
    return this.store.selectSignal(selectTurnHits(playerId));
  }

  public isPlayerActive(playerId: number): Signal<boolean> {
    return this.store.selectSignal(selectIsPlayerTurn(playerId));
  }

  public onCompleteClick(): void {
    this.store.dispatch(atcCompleteStart());
  }

  public throw(hit: boolean): void {
    this.store.dispatch(atcTrowStart({ hit }));
  }

  public undo(): void {

    // TODO: loading state
    this.store.dispatch(atcUndoStart());
  }
}

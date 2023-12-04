import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { startGameInfoLoading } from '../../../../store/actions/game-info.actions';
import { Observable, combineLatest, map } from 'rxjs';
import { selectPlayersState } from '../../store/selectors/players-state.selector';
import { AtcParticipant } from '../../models/atc-participant.interface';
import { PlayerApi } from '@models/player-api.interface';
import { selectCurrentSectorForCurrentPlayer } from '../../store/selectors/current-sector-for-current-player.selector';
import { selectUpcomingSectorsForCurrentPlayer } from '../../store/selectors/upcoming-sectors-for-current-player.selector';
import { atcCompleteStart, atcResetGame, atcTrowStart, atcUndoStart } from '../../store/actions/around-the-clock.actions';
import { selectLoading } from '../../store/selectors/loading.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectIsPlayerTurn } from '../../store/selectors/is-player-turn.selector';
import { selectCanCompleteGame } from '../../store/selectors/can-complete-game.selector';
import { selectIsGameCompleted } from '../../store/selectors/is-game-completed.selector';
import { selectIsCurrentPlayerCompleted } from '../../store/selectors/is-current-player-completed.selector';
import { selectTurnThrows } from '../../store/selectors/turn-throws.selector';
import { TurnThrows } from '../../models/turn-throws.type';
import { SectionTypes } from '@models/enums/section-types.enum';
import { selectHitDetectionMode } from '../../store/selectors/hit-detection-mode.selector';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { selectDartboardStyle } from '../../../../store/selectors/dartboard-style.selector';
import { DartboardStyles } from '@models/enums/dartboard-styles.enum';

@UntilDestroy()
@Component({
  selector: 'hd-atc-game',
  templateUrl: './atc-game.component.html',
  styleUrls: ['./atc-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameComponent implements OnInit, OnDestroy {
  public canCompleteGame$: Observable<boolean> = this.store.select(selectCanCompleteGame);
  public currentPlayerCompleted$: Observable<boolean> = this.store.select(selectIsCurrentPlayerCompleted);
  public dartboardStyle: DartboardStyles | null = null;
  public isGameNotCompleted$: Observable<boolean> = this.store.select(selectIsGameCompleted).pipe(map(completed => !completed));
  public hitDetectionMode: SectionTypes | null = null;
  public loading = true;
  public players$: Observable<(AtcParticipant & PlayerApi)[]> = this.store.select(selectPlayersState);
  public selectCurrentSectorForCurrentPlayer$: Observable<DartboardSector | undefined> = this.store.select(selectCurrentSectorForCurrentPlayer);
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

    combineLatest([
      this.store.select(selectDartboardStyle),
      this.store.select(selectHitDetectionMode),
    ]).pipe(
      untilDestroyed(this)
    ).subscribe(([dartboardStyle, hitDetectionMode]) => {
      this.dartboardStyle = dartboardStyle;
      this.hitDetectionMode = hitDetectionMode;
      this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(atcResetGame());
  }

  public isPlayerActive$(playerId: number): Observable<boolean> {
    return this.store.select(selectIsPlayerTurn(playerId));
  }

  public onCompleteClick(): void {
    this.store.dispatch(atcCompleteStart());
  }

  public throw(hit: boolean): void {
    this.store.dispatch(atcTrowStart({ hit }));
  }

  public turnThrows$(playerId: number): Observable<TurnThrows> {
    return this.store.select(selectTurnThrows(playerId));
  }

  public undo(): void {
    this.store.dispatch(atcUndoStart());
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { startGameInfoLoading } from '../../../../store/actions/game-info.actions';
import { Observable, filter, take } from 'rxjs';
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
import { selectIsCurrentPlayerCompleted } from '../../store/selectors/is-current-player-completed.selector';
import { selectTurnHits } from '../../store/selectors/turn-throws.selector';
import { TurnHits } from '../../models/turn-hits.type';
import { SectionTypes } from '@models/enums/section-types.enum';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { DartboardStyles } from '@models/enums/dartboard-styles.enum';
import { isNotEmpty } from '@functions/type-guards/is-not-empty';
import { selectIsGameNotCompleted } from '../../store/selectors/is-game-not-completed.selector';
import { selectDartboardSettings } from '../../store/selectors/dartboard-settings.selector';

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
  public isGameNotCompleted$: Observable<boolean> = this.store.select(selectIsGameNotCompleted);
  public hitDetectionMode: SectionTypes | null = null;
  public loading = true;
  public players$: Observable<(AtcParticipant & PlayerApi)[]> = this.store.select(selectPlayersState);

  public selectCurrentSectorForCurrentPlayer$: Observable<DartboardSector | undefined> =
    this.store.select(selectCurrentSectorForCurrentPlayer);

  public upcomingSectors$: Observable<number[]> = this.store.select(selectUpcomingSectorsForCurrentPlayer);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    const gameId = Number(this.activatedRoute.snapshot.paramMap.get('gameId'));
    this.store.dispatch(startGameInfoLoading({ gameId }));

    this.store.select(selectLoading).pipe(untilDestroyed(this)).subscribe(loading => {
      this.loading = loading;
      this.cdr.detectChanges();
    });

    this.store.select(selectDartboardSettings).pipe(
      filter(({ dartboardStyle, hitDetectionMode }) => isNotEmpty(dartboardStyle) && isNotEmpty(hitDetectionMode)),
      take(1),
      untilDestroyed(this)
    ).subscribe(({ dartboardStyle, hitDetectionMode }) => {
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

  public turnHits$(playerId: number): Observable<TurnHits> {
    return this.store.select(selectTurnHits(playerId));
  }

  public undo(): void {

    // TODO: loading state
    this.store.dispatch(atcUndoStart());
  }
}

import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { atcCompleteStart, atcCompleteSuccess, atcTrowStart, atcTrowSuccess, atcUndoStart, atcUndoSuccess } from '../actions/around-the-clock.actions';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { selectGameId } from '../selectors/game-id.selector';
import { selectCurrentSectorForCurrentPlayer } from '../selectors/current-sector-for-current-player.selector';
import { AroundTheClockApiService } from '../../service/around-the-clock-api.service';
import { selectCurrentPlayerId } from '../selectors/current-player-id.selector';
import { selectIsVibrationOn } from '../../../../store/selectors/is-vibration-on.selector';
import { selectTurnOverOnLastThrow } from '../selectors/turn-over-on-last-throw.selector';

@Injectable()
export class AroundTheClockEffects {
  public complete$ = createEffect(() => this.actions$.pipe(
    ofType(atcCompleteStart),
    withLatestFrom(
      this.store.select(selectGameId),
      this.store.select(selectCurrentPlayerId),
    ),
    // TOOD: check is not nil: gameId, playerId - throw error
    switchMap(([_, gameId, PlayerId]) => this.atcApi.complete(gameId ?? 0, PlayerId ?? 0)),
    map(() => atcCompleteSuccess())
  ));

  public throw$ = createEffect(() => this.actions$.pipe(
    ofType(atcTrowStart),
    withLatestFrom(
      this.store.select(selectGameId),
      this.store.select(selectCurrentSectorForCurrentPlayer),
      this.store.select(selectCurrentPlayerId),
    ),
    switchMap(([{ hit }, gameId, sector, playerId]) =>
      // TOOD: check is not nil: sector, gameId, playerId - throw error
      this.atcApi.throw(sector ?? 0, hit, gameId ?? 0, playerId ?? 0)
        .pipe(map(() => atcTrowSuccess({ hit })))
    )
  ));

  public undo$ = createEffect(() => this.actions$.pipe(
    ofType(atcUndoStart),
    withLatestFrom(
      this.store.select(selectGameId),
      this.store.select(selectCurrentPlayerId),
    ),
    switchMap(([_, gameId, playerId]) => this.atcApi.undo(gameId ?? 0, playerId ?? 0)),
    map((lastThrow) => atcUndoSuccess({ lastThrow }))
  ));

  public vibrateOnEndOfTurn$ = createEffect(() => this.actions$.pipe(
    ofType(atcTrowSuccess),
    concatLatestFrom(() => [
      this.store.select(selectTurnOverOnLastThrow),
      this.store.select(selectIsVibrationOn),
    ]),
    filter(([_, turnOver, vibrationOn]) => turnOver && vibrationOn),
    tap(() => navigator.vibrate(200))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<{ aroundTheClock: AroundTheClockState }>,
    private atcApi: AroundTheClockApiService,
  ) { }
}

import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  atcCompleteStart,
  atcCompleteSuccess,
  atcTrowStart,
  atcTrowSuccess,
  atcUndoError,
  atcUndoStart,
  atcUndoSuccess
} from '../actions/around-the-clock.actions';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGameId } from '../selectors/game-id.selector';
import { selectCurrentSectorForCurrentPlayer } from '../selectors/current-sector-for-current-player.selector';
import { AroundTheClockApiService } from '../../service/around-the-clock-api.service';
import { selectCurrentPlayerId } from '../selectors/current-player-id.selector';
import { selectIsVibrationOn } from '../../../../store/selectors/is-vibration-on.selector';
import { selectTurnOverOnLastThrow } from '../selectors/turn-over-on-last-throw.selector';
import { selectIsSoundsOn } from '../../../../store/selectors/is-sounds-on.selector';
import { selectTurnHitsCurrentPlayer } from '../selectors/turn-hits-current-player.selector';
import { isEmpty } from '@functions/type-guards/is-empty';
import { HttpErrorResponse } from '@angular/common/http';
import { ThrowsApiService } from '../../../../services/throws-api.service';
import { selectTotalThrowsAllPlayers } from '../selectors/total-throws-all-players.selector';
import { throwsPerTurn } from '@constants/throws-per-turn';

@Injectable()
export class AroundTheClockEffects {
  public complete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(atcCompleteStart),
      concatLatestFrom(() => [
        this.store.select(selectGameId),
      ]),

      // TOOD: check is not nil: gameId - throw error
      switchMap(([_, gameId]) => this.atcApi.complete(gameId ?? 0)),
      map(() => atcCompleteSuccess())
    );
  });

  public throw$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(atcTrowStart),
      concatLatestFrom(() => [
        this.store.select(selectGameId),
        this.store.select(selectCurrentSectorForCurrentPlayer),
        this.store.select(selectCurrentPlayerId),
      ]),
      switchMap(([{ hit }, gameId, sector, playerId]) =>

        // TOOD: check is not nil: sector, gameId, playerId - throw error
        this.atcApi.throw(sector ?? 0, hit, gameId ?? 0, playerId ?? 0)
          .pipe(map(() => atcTrowSuccess({ hit })))
      )
    );
  });

  public undo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(atcUndoStart),
      concatLatestFrom(() => [
        this.store.select(selectGameId),
        this.store.select(selectCurrentPlayerId),
        this.store.select(selectTurnHitsCurrentPlayer),
        this.store.select(selectTotalThrowsAllPlayers),
      ]),
      switchMap(([_, gameId, playerId, turnHits, totalThrows]) => {
        if (isEmpty(gameId) || isEmpty(playerId)) {
          return of(atcUndoError({
            err: `Incorrect one of following parameters: gameId = ${gameId}, playerId = ${playerId}`
          }));
        }

        if (totalThrows === 0) {
          return of(atcUndoSuccess({ canceledThrow: null, lastThrows: [] }));
        }

        return this.atcApi.undo(gameId).pipe(
          switchMap((canceledThrow) => (isEmpty(turnHits) || turnHits.length === 0) && canceledThrow
            ? this.throwsApiService.getThrows(gameId, { page: 0, size: throwsPerTurn }, playerId).pipe(
              map((lastThrows) => atcUndoSuccess({ canceledThrow, lastThrows }))
            )
            : of(atcUndoSuccess({ canceledThrow, lastThrows: [] }))
          ),
        );
      }),
      catchError((err: HttpErrorResponse) => of(atcUndoError({ err })))
    );
  });

  public vibrateOnEndOfTurn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(atcTrowSuccess),
      concatLatestFrom(() => [
        this.store.select(selectTurnOverOnLastThrow),
        this.store.select(selectIsVibrationOn),
      ]),
      filter(([_, turnOver, vibrationOn]) => turnOver && vibrationOn),
      tap(() => navigator.vibrate(200))
    );
  }, { dispatch: false });

  public soundOnThrowEnd$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(atcTrowSuccess),
      concatLatestFrom(() => this.store.select(selectIsSoundsOn)),
      filter(([_, sounds]) => sounds),
      tap(() => {
        new Audio('/assets/sounds/hit.ogg').play();
      }),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store,
    private atcApi: AroundTheClockApiService,
    private throwsApiService: ThrowsApiService,
  ) { }
}

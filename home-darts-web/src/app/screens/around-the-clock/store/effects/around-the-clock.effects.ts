import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { atcCompleteStart, atcCompleteSuccess, atcTrowStart, atcTrowSuccess, atcUndoStart, atcUndoSuccess } from '../actions/around-the-clock.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { selectGameId } from '../selectors/game-id.selector';
import { selectCurrentSectorForCurrentPlayer } from '../selectors/current-sector-for-current-player.selector';
import { AroundTheClockApiService } from '../../service/around-the-clock-api.service';
import { selectCurrentPlayerId } from '../selectors/current-player-id.selector';

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

  constructor(
    private actions$: Actions,
    private store: Store<{ aroundTheClock: AroundTheClockState }>,
    private atcApi: AroundTheClockApiService,
  ) { }
}

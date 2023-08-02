import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { atcTrowStart, atcTrowSuccess, atcUndoStart, atcUndoSuccess } from '../actions/around-the-clock.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { selectGameId } from '../selectors/game-id.selector';
import { selectCurrentSectorForCurrentPlayer } from '../selectors/current-sector-for-current-player.selector';
import { AroundTheClockApiService } from '../../service/around-the-clock-api.service';
import { selectCurrentPlayerId } from '../selectors/current-player-id.selector';

@Injectable()
export class AroundTheClockEffects {
  public throw$ = createEffect(() => this.actions$.pipe(
    ofType(atcTrowStart),
    withLatestFrom(
      this.store.select(selectGameId),
      this.store.select(selectCurrentSectorForCurrentPlayer),
      this.store.select(selectCurrentPlayerId),
    ),
    switchMap(([{ hit }, gameId, sector, playerId]) =>
      // TOOD: throw error if no gameId and playerId
      this.atcApi.throw(sector, hit, gameId ?? 0, playerId ?? 0)
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

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { gameInfoLoadingError, startGameInfoLoading, gameInfoLoadingSuccess } from '../actions/game-info.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { GameApiService } from '../../services/game-api.service';
import { ThrowsApiService } from '../../services/throws-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GameInfoEffects {
  public loadGameInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startGameInfoLoading),
      switchMap(({ gameId }) => this.gameApi.getGameInfo(gameId).pipe(
        map((gameInfo) => ({ gameInfo, gameId }))
      )),
      switchMap(({ gameInfo, gameId }) => this.throwsApi.getThrowsGrouped(gameId).pipe(
        map((throwsGrouped) => ({ gameInfo, throwsGrouped }))
      )),
      map(({ gameInfo, throwsGrouped }) => gameInfoLoadingSuccess({ gameInfo, throwsGrouped })),
      catchError((err: HttpErrorResponse) => of(gameInfoLoadingError({ err })))
    );
  });

  constructor(
    private actions$: Actions,
    private gameApi: GameApiService,
    private throwsApi: ThrowsApiService,
  ) { }
}

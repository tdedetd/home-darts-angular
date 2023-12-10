import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { gameInfoLoadingError, startGameInfoLoading, gameInfoLoadingSuccess } from '../actions/game-info.actions';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { GameApiService } from '../../services/game-api.service';
import { ThrowsApiService } from '../../services/throws-api.service';

@Injectable()
export class GameInfoEffects {
  public loadGameInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startGameInfoLoading),
      switchMap(({ gameId }) => forkJoin([
        this.gameApi.getGameInfo(gameId),
        this.throwsApi.getThrowsGrouped(gameId)
      ])),
      map(([gameInfo, throwsGrouped]) => gameInfoLoadingSuccess({ gameInfo, throwsGrouped })),
      catchError(() => of(gameInfoLoadingError()))
    );
  });

  constructor(
    private actions$: Actions,
    private gameApi: GameApiService,
    private throwsApi: ThrowsApiService,
  ) { }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { gameInfoLoadingStarted, gameInfoLoadingSuccessful } from '../actions/home-darts.actions';
import { map, switchMap } from 'rxjs';
import { GameApiService } from '../../services/game-api.service';

@Injectable()
export class HomeDartsEffects {
  public loadGameInfo$ = createEffect(() => this.actions$.pipe(
    ofType(gameInfoLoadingStarted),
    switchMap(({ gameId }) => this.gameApi.getGameInfo(gameId)),
    map(gameInfo => gameInfoLoadingSuccessful({ gameInfo })),
  ));

  constructor(private actions$: Actions, private gameApi: GameApiService) { }
}

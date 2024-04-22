import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThrowsApiService } from '../../../../services/throws-api.service';
import { getGameInfoLoadingSuccess } from '../../../../store/actions/game-info.actions';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';
import { forkJoin, map, switchMap } from 'rxjs';
import { atcGameInitialized } from '../actions/around-the-clock.actions';
import { throwsPerTurn } from '@constants/throws-per-turn';
import { PlayerApi } from '@models/player-api.interface';
import { ThrowApi } from '@models/throw-api.interface';

@Injectable()
export class AroundTheClockEffectsInit {
  public init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGameInfoLoadingSuccess<AroundTheClockParams>()),
      switchMap(({ gameInfo, throwsGrouped }) => {
        const throwsByPlayers$ = gameInfo.players.map(player => {
          return this.throwsApiService.getThrows(gameInfo.id, { size: throwsPerTurn }, player.id).pipe(
            map((throwsApi): [PlayerApi['id'], ThrowApi[]] => [player.id, throwsApi])
          );
        });

        return forkJoin(throwsByPlayers$).pipe(
          map(throwsByPlayers => ({
            gameInfo, throwsGrouped, lastThrowsByPlayers: Object.fromEntries(throwsByPlayers)
          }))
        );
      }),
      map((payload) => atcGameInitialized(payload))
    );
  });

  constructor(
    private actions$: Actions,
    private throwsApiService: ThrowsApiService,
  ) { }
}

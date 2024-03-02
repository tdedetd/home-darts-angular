import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThrowsApiService } from '../../../../services/throws-api.service';
import { getGameInfoLoadingSuccess } from '../../../../store/actions/game-info.actions';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';
import { map, switchMap } from 'rxjs';
import { atcGameInitialized } from '../actions/around-the-clock.actions';
import { throwsPerTurn } from '@constants/throws-per-turn';

@Injectable()
export class AroundTheClockEffectsInit {
  public init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGameInfoLoadingSuccess<AroundTheClockParams>()),
      switchMap(({ gameInfo, throwsGrouped }) => this.throwsApiService.getThrows(gameInfo.id, 0, throwsPerTurn).pipe(
        map((lastThrows) => atcGameInitialized({ lastThrows, gameInfo, throwsGrouped }))
      )),
    );
  });

  constructor(
    private actions$: Actions,
    private throwsApiService: ThrowsApiService,
  ) { }
}

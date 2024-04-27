import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changePlayerSelectedEnd,
  changePlayerSelectedStart,
  initStatistics,
  loadPlayers,
  loadPlayersError,
  loadPlayersSuccess,
  statisticsError,
  statisticsLoaded
} from '../actions/statistics.actions';
import { catchError, debounceTime, map, of, switchMap, tap } from 'rxjs';
import { PlayerApiService } from '../../../../services/player-api.service';
import { DefaultPlayerService } from '../../../../services/default-player.service';

@Injectable()
export class StatisticsEffects {
  public initStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initStatistics),
      map(() => loadPlayers()),
    );
  });

  public liadPlayers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlayers),
      switchMap(() => this.playerApi.getPlayers()),
      map((players) => players.length
        ? loadPlayersSuccess({ players })
        : loadPlayersError({ error: 'No players' })
      ),
      catchError((error) => of(loadPlayersError({ error }))),
    );
  });

  public loadDefaultPlayer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlayersSuccess),
      map(({ players }) => {
        const playerId = this.defaultPlayer.load();
        const player = players.find(({ id }) => id === playerId);
        return changePlayerSelectedEnd({ playerId: player ? player.id : players[0].id });
      }),
    );
  });

  public handlePlayerSelectedChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePlayerSelectedStart),
      debounceTime(500),
      map(({ playerId }) => changePlayerSelectedEnd({ playerId }))
    );
  });

  public saveDefaultPlayer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePlayerSelectedEnd),
      tap(({ playerId }) => this.defaultPlayer.save(playerId)),
    );
  }, { dispatch: false });

  public loadStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePlayerSelectedEnd),
      switchMap(({ playerId }) => this.playerApi.getPlayerStats(playerId)),
      map((stats) => statisticsLoaded({ stats })),
      catchError(error => of(statisticsError({ error }))),
    );
  });

  constructor(
    private actions$: Actions,
    private playerApi: PlayerApiService,
    private defaultPlayer: DefaultPlayerService,
  ) { }
}

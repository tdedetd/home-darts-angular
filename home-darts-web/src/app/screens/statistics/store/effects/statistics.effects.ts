import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import {
  atcHitRateError,
  atcHitRateLoaded,
  changePlayerSelectedEnd,
  changePlayerSelectedStart,
  initStatistics,
  loadPlayers,
  loadPlayersError,
  loadPlayersSuccess,
  statisticsError,
  statisticsLoaded
} from '../actions/statistics.actions';
import { catchError, debounceTime, filter, map, of, switchMap, tap } from 'rxjs';
import { PlayerApiService } from '../../../../services/player-api.service';
import { DefaultPlayerService } from '../../../../services/default-player.service';
import { Store } from '@ngrx/store';
import { selectPlayerIdSelected } from '../selectors/player-id-selected.selector';
import { selectAtcFilter } from '../selectors/atc-filter.selector';
import { StatisticsApiService } from '../../services/statistics-api.service';
import { isNotEmpty } from '../../../../utils/functions/type-guards/is-not-empty';
import { AtcStatisticsFilter } from '../../models/atc-statistics-filter.interface';

@Injectable()
export class StatisticsEffects {
  public initStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initStatistics),
      map(() => loadPlayers()),
    );
  });

  public loadPlayers$ = createEffect(() => {
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

  public loadHitRate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePlayerSelectedEnd),
      concatLatestFrom(() => [
        this.store.select(selectPlayerIdSelected),
        this.store.select(selectAtcFilter),
      ]),
      filter((data): data is [never, number, AtcStatisticsFilter] => isNotEmpty(data)),
      switchMap(([_, playerId, filter]) => this.statisticsApi.hitRate(playerId, {
        hitDetection: filter.hitDetection
      })),
      map(hitRate => atcHitRateLoaded({ hitRate })),
      catchError(error => of(atcHitRateError({ error }))),
    );
  });

  constructor(
    private actions$: Actions,
    private playerApi: PlayerApiService,
    private defaultPlayer: DefaultPlayerService,
    private store: Store,
    private statisticsApi: StatisticsApiService,
  ) { }
}

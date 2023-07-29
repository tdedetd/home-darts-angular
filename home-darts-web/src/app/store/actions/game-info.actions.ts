import { createAction, props } from '@ngrx/store';
import { GameInfoApi } from '@models/game-info-api.interface';
import { GameParamTypes } from '../../models/game-param-types.enum';
import { ThrowsGrouped } from '../../models/throws-grouped';

const source = '[Game Info]';

export const startGameInfoLoading = createAction(
  `${source} Start Loading`,
  props<{ gameId: number }>()
);

export const getGameInfoLoadingSuccess = <GameParams extends object = Partial<Record<GameParamTypes, unknown>>>() =>
  createAction(
    `${source} Loading Success`,
    props<{ gameInfo: GameInfoApi<GameParams>, throwsGrouped: ThrowsGrouped[] }>()
  );

export const gameInfoLoadingSuccess = getGameInfoLoadingSuccess();

export const gameInfoLoadingError = createAction(`${source} Loading Error`);

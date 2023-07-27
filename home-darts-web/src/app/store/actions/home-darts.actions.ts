import { createAction, props } from '@ngrx/store';
import { GameInfoApi } from '@models/game-info-api.interface';
import { GameParamTypes } from '../../models/game-param-types.enum';
import { ThrowsGrouped } from '../../models/throws-grouped';

// TODO: rename game info
const source = '[Home darts]';

export const startGameInfoLoading = createAction(
  `${source} Start Game Info Loading`,
  props<{ gameId: number }>()
);

export const getGameInfoLoadingSuccess = <GameParams extends object = Partial<Record<GameParamTypes, unknown>>>() =>
  createAction(
    `${source} Game Info Loading Success`,
    props<{ gameInfo: GameInfoApi<GameParams>, throwsGrouped: ThrowsGrouped[] }>()
  );

export const gameInfoLoadingSuccess = getGameInfoLoadingSuccess();

export const gameInfoLoadingError = createAction(`${source} Game Info Loading Error`);

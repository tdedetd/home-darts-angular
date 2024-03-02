import { createAction, props } from '@ngrx/store';
import { GameInfoApi } from '@models/game-info-api.interface';
import { GameParamTypes } from '@models/enums/game-param-types.enum';
import { ThrowsGrouped } from '@models/throws-grouped.interface';
import { HttpErrorResponse } from '@angular/common/http';

const source = '[Game Info]';

export const startGameInfoLoading = createAction(
  `${source} Start Loading`,
  props<{ gameId: number }>()
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getGameInfoLoadingSuccess = <GameParams extends object = Partial<Record<GameParamTypes, unknown>>>() =>
  createAction(
    `${source} Loading Success`,
    props<{ gameInfo: GameInfoApi<GameParams>, throwsGrouped: ThrowsGrouped[] }>()
  );

export const gameInfoLoadingSuccess = getGameInfoLoadingSuccess();

export const gameInfoLoadingError = createAction(
  `${source} Loading Error`,
  props<{ err: HttpErrorResponse }>()
);

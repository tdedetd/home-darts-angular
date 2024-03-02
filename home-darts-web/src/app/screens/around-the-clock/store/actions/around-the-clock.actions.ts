import { createAction, props } from '@ngrx/store';
import { ThrowApi } from '@models/throw-api.interface';
import { GameInfoApi } from '@models/game-info-api.interface';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';
import { ThrowsGrouped } from '@models/throws-grouped.interface';

const source = '[Around The Clock]';

export const atcGameInitialized = createAction(
  `${source} Initialized`,
  props<{ gameInfo: GameInfoApi<AroundTheClockParams>, throwsGrouped: ThrowsGrouped[], lastThrows: ThrowApi[] }>()
);

export const atcResetGame = createAction(`${source} Reset Game`);

export const atcTrowStart = createAction(`${source} Trow Start`, props<{ hit: boolean }>());
export const atcTrowSuccess = createAction(`${source} Trow Success`, props<{ hit: boolean }>());

export const atcUndoStart = createAction(`${source} Undo Start`);
export const atcUndoSuccess = createAction(`${source} Undo Success`, props<{ lastThrow: ThrowApi | null }>());

export const atcCompleteStart = createAction(`${source} Complete Start`);
export const atcCompleteSuccess = createAction(`${source} Complete Success`);

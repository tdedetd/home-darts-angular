import { createAction, props } from '@ngrx/store';
import { ThrowApi } from '@models/throw-api.interface';

const source = '[Around The Clock]';

export const atcResetGame = createAction(`${source} Reset Game`);

export const atcTrowStart = createAction(`${source} Trow Start`, props<{ hit: boolean }>());
export const atcTrowSuccess = createAction(`${source} Trow Success`, props<{ hit: boolean }>());

export const atcUndoStart = createAction(`${source} Undo Start`);
export const atcUndoSuccess = createAction(`${source} Undo Success`, props<{ lastThrow: ThrowApi | null }>());

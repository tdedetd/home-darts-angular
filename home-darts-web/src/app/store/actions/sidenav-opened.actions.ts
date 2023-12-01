import { createAction } from '@ngrx/store';

const source = '[Sidenav]';

export const toggleSidenav = createAction(`${source} Toggle`);
export const closeSidenav = createAction(`${source} Close`);

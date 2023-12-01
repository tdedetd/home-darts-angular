import { createAction } from '@ngrx/store';

const source = '[Global Progress Bar]';

export const showGlobalProgressBar = createAction(`${source} Show`);
export const hideGlobalProgressBar = createAction(`${source} Hide`);

import { createReducer, on } from '@ngrx/store';
import { closeSidenav, toggleSidenav } from '../actions/sidenav-opened.actions';

const defaultValue = false;

export const sidenavOpenedReducer = createReducer(
  defaultValue,
  on(toggleSidenav, (state) => !state),
  on(closeSidenav, () => false),
);

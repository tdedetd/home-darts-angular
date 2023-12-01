import { createFeatureSelector } from '@ngrx/store';
import { sidenavOpenedKey } from '../constants/state-features/sidenav-opened-key';

export const selectSidenavOpened = createFeatureSelector<boolean>(sidenavOpenedKey);

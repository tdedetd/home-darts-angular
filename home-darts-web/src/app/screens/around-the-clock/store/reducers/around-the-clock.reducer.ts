import { createReducer, on } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.inteface';
import { getGameInfoLoadingSuccessful } from '../../../../store/actions/home-darts.actions';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';
import { atcResetGame } from '../actions/around-the-clock.actions';
import { getSectionsForAroundTheClock } from '../../utils/functions/get-sections-for-around-the-clock';

const initialState: AroundTheClockState = {
  gameInfo: null,
  sections: [],
};

export const aroundTheClockReducer = createReducer<AroundTheClockState>(
  initialState,
  on(getGameInfoLoadingSuccessful<AroundTheClockParams>(), (state, { gameInfo }): AroundTheClockState => ({
    ...state,
    gameInfo,
    sections: getSectionsForAroundTheClock(gameInfo.params.direction, gameInfo.params.includeBull),
  })),
  on(atcResetGame, (): AroundTheClockState => initialState),
);

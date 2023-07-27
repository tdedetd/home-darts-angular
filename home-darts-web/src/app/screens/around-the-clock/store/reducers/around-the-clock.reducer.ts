import { createReducer, on } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.inteface';
import { gameInfoLoadingError, getGameInfoLoadingSuccess } from '../../../../store/actions/home-darts.actions';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';
import { atcResetGame } from '../actions/around-the-clock.actions';
import { getSectionsForAroundTheClock } from '../../utils/functions/get-sections-for-around-the-clock';
import { GameLoadingStatuses } from '@models/game-loading-statuses.enum';

const initialState: AroundTheClockState = {
  currentPlayerId: null,
  gameInfo: null,
  loadingStatus: GameLoadingStatuses.Pending,
  sections: [],
  participants: {},
};

export const aroundTheClockReducer = createReducer<AroundTheClockState>(
  initialState,
  on(getGameInfoLoadingSuccess<AroundTheClockParams>(), (state, { gameInfo, throwsGrouped }): AroundTheClockState => {
    const sections = getSectionsForAroundTheClock(gameInfo.params.direction, gameInfo.params.includeBull);
    return {
      ...state,
      currentPlayerId: throwsGrouped[0].playerId,
      gameInfo,
      loadingStatus: GameLoadingStatuses.Initiated,
      sections,
      participants: throwsGrouped.reduce<AroundTheClockState['participants']>((acc, { playerId, hits, throws }) => ({
        ...acc,
        [playerId]: {
          hits, throws,
          isCompleted: hits === sections.length
        }
      }), {}),
    };
  }),
  on(gameInfoLoadingError, () => ({
    ...initialState,
    loadingStatus: GameLoadingStatuses.Error,
  })),
  on(atcResetGame, (): AroundTheClockState => initialState),
);

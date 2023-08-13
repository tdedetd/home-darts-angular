import { createReducer, on } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { gameInfoLoadingError, getGameInfoLoadingSuccess } from '../../../../store/actions/game-info.actions';
import { AroundTheClockParams } from '../../models/around-the-clock-params.interface';
import { atcCompleteSuccess, atcResetGame, atcTrowStart, atcTrowSuccess, atcUndoSuccess } from '../actions/around-the-clock.actions';
import { getSectionsForAroundTheClock } from '../../utils/functions/get-sections-for-around-the-clock';
import { GameLoadingStatuses } from '@models/game-loading-statuses.enum';
import { getParticipantAfterThrow } from './utils/get-participant-after-throw';
import { checkIfTurnOverAndGetNextPlayerId } from './utils/check-if-turn-over-and-get-next-player-id';
import { getCurrentPlayerOnLoad } from './utils/get-current-player-on-load';

const initialState: AroundTheClockState = {
  currentPlayerId: null,
  gameInfo: null,
  loading: true,
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
      currentPlayerId: getCurrentPlayerOnLoad(gameInfo, throwsGrouped),
      gameInfo,
      loading: false,
      loadingStatus: GameLoadingStatuses.Initiated,
      sections,
      // TODO: default values for non-existing participants
      participants: throwsGrouped.reduce<AroundTheClockState['participants']>((acc, { playerId, hits, throws }) => ({
        ...acc,
        [playerId]: {
          hits, throws,
          isCompleted: hits === sections.length,
          turnThrows: [],
        }
      }), {}),
    };
  }),
  on(gameInfoLoadingError, () => ({
    ...initialState,
    loadingStatus: GameLoadingStatuses.Error,
  })),
  on(atcResetGame, () => initialState),
  on(atcTrowStart, (state) => ({ ...state, loading: true })),
  on(atcTrowSuccess, (state, { hit }) =>
    state.currentPlayerId ? {
      ...state,
      currentPlayerId: checkIfTurnOverAndGetNextPlayerId(state),
      loading: false,
      participants: {
        ...state.participants,
        [state.currentPlayerId]: (
          state.participants[state.currentPlayerId]
            ? getParticipantAfterThrow(state.sections, hit, false, state.participants[state.currentPlayerId])
            : getParticipantAfterThrow(state.sections, hit, false)
        )
      }
    } : state
  ),
  on(atcUndoSuccess, (state, { lastThrow }) => 
    state.currentPlayerId && state.participants[state.currentPlayerId] && lastThrow ? {
      ...state,
      loading: false,
      participants: {
        ...state.participants,
        [state.currentPlayerId]: getParticipantAfterThrow(
          state.sections, lastThrow.hit, true, state.participants[state.currentPlayerId])
      }
    } : state
  ),
  on(atcCompleteSuccess, (state) => ({
    ...state,
    gameInfo: state.gameInfo ? {
      ...state.gameInfo,
      isCompleted: true,
    } : state.gameInfo
  }))
);

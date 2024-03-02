import { createReducer, on } from '@ngrx/store';
import { AroundTheClockState } from '../../models/around-the-clock-state.interface';
import { gameInfoLoadingError } from '../../../../store/actions/game-info.actions';
import {
  atcCompleteSuccess,
  atcGameInitialized,
  atcResetGame,
  atcTrowStart,
  atcTrowSuccess,
  atcUndoSuccess
} from '../actions/around-the-clock.actions';
import { getSectionsForAroundTheClock } from '../../utils/functions/get-sections-for-around-the-clock';
import { GameLoadingStatuses } from '@models/enums/game-loading-statuses.enum';
import { getParticipantAfterThrow } from './utils/get-participant-after-throw';
import { getNextPlayerId } from './utils/get-next-player-id';
import { getCurrentPlayerOnInit } from './utils/get-current-player-on-init';
import { checkTurnOver } from './utils/check-turn-over';
import { isNotEmpty } from '@functions/type-guards/is-not-empty';
import { AtcParticipants } from '../../models/atc-participants.type';
import { getIsCompleted } from './utils/get-is-completed';
import { isPerfectTurn } from './utils/is-perfect-turn';
import { HttpStatusCode } from '@angular/common/http';

const initialState: AroundTheClockState = {
  initStatus: GameLoadingStatuses.Pending,
  currentPlayerId: null,
  gameInfo: null,
  loading: true,
  sections: [],
  participants: {},
  turnOverOnLastThrow: false,
};

export const aroundTheClockReducer = createReducer<AroundTheClockState>(
  initialState,
  on(atcGameInitialized, (state, { gameInfo, throwsGrouped, lastThrows }): AroundTheClockState => {
    const sections = getSectionsForAroundTheClock(gameInfo.params.direction, gameInfo.params.includeBull);
    return {
      ...state,
      initStatus: GameLoadingStatuses.Initiated,
      currentPlayerId: getCurrentPlayerOnInit(gameInfo.players, throwsGrouped, sections, lastThrows),
      gameInfo,
      loading: false,
      sections,

      // TODO: default values for non-existing participants
      participants: throwsGrouped.reduce<AtcParticipants>((acc, { playerId, hits, throws }) => ({
        ...acc,
        [playerId]: {
          hits,
          throws,
          isCompleted: getIsCompleted(hits, sections),
          turnHits: [],
        }
      }), {}),
    };
  }),
  on(gameInfoLoadingError, (_, { err }): AroundTheClockState => ({
    ...initialState,
    initStatus: err.status === HttpStatusCode.NotFound
      ? GameLoadingStatuses.NoSuchGame
      : GameLoadingStatuses.UnexpectedError,
  })),
  on(atcResetGame, (): AroundTheClockState => initialState),
  on(atcTrowStart, (state): AroundTheClockState => ({ ...state, loading: true })),
  on(atcTrowSuccess, (state, { hit }): AroundTheClockState => {
    if (state.currentPlayerId === null) {
      return state;
    }

    const isTurnOver = checkTurnOver(state);
    const participantAfterThrow = getParticipantAfterThrow(
      state.sections, hit, false, state.participants[state.currentPlayerId]
    );

    const newCurrentPlayerId = isTurnOver && !isPerfectTurn(participantAfterThrow.turnHits) || participantAfterThrow.isCompleted
      ? getNextPlayerId(state) : state.currentPlayerId;

    const newParticipantTurnHits: AtcParticipants | object = (
      isTurnOver && isNotEmpty(newCurrentPlayerId) && state.participants[newCurrentPlayerId] ? {
        [newCurrentPlayerId]: {
          ...state.participants[newCurrentPlayerId],
          ...(state.currentPlayerId === newCurrentPlayerId ? participantAfterThrow : {}),
          turnHits: [],
        }
      } : {}
    );

    return {
      ...state,
      currentPlayerId: newCurrentPlayerId,
      loading: false,
      participants: {
        ...state.participants,
        [state.currentPlayerId]: participantAfterThrow,
        ...newParticipantTurnHits
      },
      turnOverOnLastThrow: isTurnOver || participantAfterThrow.isCompleted,
    };
  }),
  on(atcUndoSuccess, (state, { lastThrow }): AroundTheClockState =>
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
  on(atcCompleteSuccess, (state): AroundTheClockState => ({
    ...state,
    gameInfo: state.gameInfo ? {
      ...state.gameInfo,
      isCompleted: true,
    } : state.gameInfo
  }))
);

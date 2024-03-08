import { ThrowApi } from '@models/throw-api.interface';
import { AtcParticipants } from '../../../models/atc-participants.type';
import { AroundTheClockState } from '../../../models/around-the-clock-state.interface';
import { isThrowsOfTurn } from '../../../utils/functions/type-guards/is-throws-of-turn';
import { AroundTheClockError } from '../../../models/errors/around-the-clock-error';
import { getNextPlayerId } from './get-next-player-id';
import { isEmpty } from '@functions/type-guards/is-empty';

export function getAffectedParticipantsAfterUndo(
  state: AroundTheClockState,
  lastThrows: ThrowApi[],
  canceledThrow: ThrowApi
): {
  newParticipants: AtcParticipants,
  newCurrentPlayerId: AroundTheClockState['currentPlayerId'],
} {
  if (!state.currentPlayerId) {
    return {
      newCurrentPlayerId: state.currentPlayerId,
      newParticipants: state.participants,
    };
  }

  const affectedOnlyCurrentPlayer = state.participants[state.currentPlayerId].turnHits.length > 0;

  if (affectedOnlyCurrentPlayer) {
    const participant = state.participants[state.currentPlayerId];
    const hits = participant.hits - Number(canceledThrow.hit);
    const newThrowsOfTurn = participant.turnHits.slice(0, participant.turnHits.length - 1);

    if (!isThrowsOfTurn(newThrowsOfTurn)) {
      throw new AroundTheClockError('Incorrect value of newThrowsOfTurn');
    }

    return {
      newCurrentPlayerId: state.currentPlayerId,
      newParticipants: {
        [state.currentPlayerId]: {
          hits,
          isCompleted: false,
          throws: participant.throws - 1,
          turnHits: newThrowsOfTurn
        }
      }
    };
  } else {
    const currentParticipant = state.participants[state.currentPlayerId];
    const previousPlayerId = getNextPlayerId(state, true);

    if (isEmpty(previousPlayerId)) {
      throw new AroundTheClockError('No previousPlayerId');
    }

    const previousParticipant = state.participants[previousPlayerId];
    const newThrowsOfTurn = lastThrows.map(({ hit }) => hit);

    if (!isThrowsOfTurn(newThrowsOfTurn)) {
      throw new AroundTheClockError('Incorrect value of newThrowsOfTurn');
    }

    if (state.currentPlayerId === previousPlayerId) {
      const hits = currentParticipant.hits - Number(canceledThrow.hit);

      return {
        newCurrentPlayerId: state.currentPlayerId,
        newParticipants: {
          [state.currentPlayerId]: {
            turnHits: newThrowsOfTurn,
            hits,
            isCompleted: false,
            throws: currentParticipant.throws - 1,
          }
        },
      };
    } else {
      const hits = previousParticipant.hits - Number(canceledThrow.hit);
      const newPreviousPlayerTheowsOfTurn = previousParticipant.turnHits.slice(0, previousParticipant.turnHits.length - 1);

      if (!isThrowsOfTurn(newPreviousPlayerTheowsOfTurn)) {
        throw new AroundTheClockError('Incorrect value of newPreviousPlayerTheowsOfTurn');
      }

      return {
        newCurrentPlayerId: previousPlayerId,
        newParticipants: {
          [state.currentPlayerId]: {
            ...state.participants[state.currentPlayerId],
            turnHits: newThrowsOfTurn,
          },
          [previousPlayerId]: {
            ...previousParticipant,
            hits,
            isCompleted: false,
            throws: previousParticipant.throws - 1,
            turnHits: newPreviousPlayerTheowsOfTurn
          }
        },
      };
    }
  }
}

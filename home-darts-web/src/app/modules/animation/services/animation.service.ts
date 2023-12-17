import { Injectable } from '@angular/core';
import { AnimateCallback } from '../models/animate-callback.type';
import { AnimationOptions } from '../models/animation-options.interface';
import { AnimationsList } from '../classes/animations-list';
import { TimingFunction } from '../models/timing-function.type';
import { isNotEmpty } from '@functions/type-guards/is-not-empty';
import { TimingFunctions } from '../models/timing-functions.enum';
import { timingFunctionsMapper } from '../constants/timing-functions-mapper';
import { AnimationStates } from '../models/animation-states.enum';

@Injectable()
export class AnimationService {
  private readonly animationsList = new AnimationsList();

  private static ended(difference: number, duration: number): boolean {
    return difference >= duration;
  }

  private static get nowMs(): number {
    return (new Date()).getTime();
  }

  public play(callback: AnimateCallback, options: AnimationOptions): number {
    const startTimeMs = AnimationService.nowMs;
    const { durationMs } = options;
    const refreshTimeout = options.refreshTimeout ?? 100;
    const onFinishState = options.onFinishState ?? AnimationStates.Final;
    const timingFunction: TimingFunction = isNotEmpty(options.timingFunction)
      ? typeof options.timingFunction === 'function'
        ? options.timingFunction
        : timingFunctionsMapper[options.timingFunction]
      : timingFunctionsMapper[TimingFunctions.Linear];

    callback(0);
    const intervalId = window.setInterval(() => {
      const timeDifferenceMs = AnimationService.nowMs - startTimeMs;

      const ended = AnimationService.ended(timeDifferenceMs, durationMs);
      let timePhase: number;
      if (ended) {
        timePhase = onFinishState === AnimationStates.Initial ? 0 : 1;
        this.animationsList.clear(intervalId);
      } else {
        timePhase = timeDifferenceMs / durationMs;
      }

      callback(timingFunction(timePhase));
    }, refreshTimeout);
    this.animationsList.add(intervalId, callback, options);

    return intervalId;
  }

  public interrupt(
    intervalId: number,
    setState: AnimationStates = AnimationStates.Current
  ): void {
    this.animationsList.interrupt(intervalId, setState);
  }
}

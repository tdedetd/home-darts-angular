import { Injectable } from '@angular/core';
import { AnimateCallback } from '../models/animate-callback.type';
import { AnimationOptions } from '../models/animation-options.interface';
import { AnimationsList } from '../classes/animations-list';
import { AnimationInterruptionMode } from '../models/animation-interruption-mode.enum';
import { TimingFunction } from '../models/timing-function.type';
import { isNotEmpty } from '../../../utils/functions/type-guards/is-not-empty';
import { TimingFunctions } from '../models/timing-functions.enum';
import { timingFunctionsMapper } from '../constants/timing-functions-mapper';

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
    const timingFunction: TimingFunction = isNotEmpty(options.timingFunction)
      ? typeof options.timingFunction === 'function'
        ? options.timingFunction
        : timingFunctionsMapper[options.timingFunction]
      : timingFunctionsMapper[TimingFunctions.Linear];

    callback(0);
    const intervalId = window.setInterval(() => {
      const timeDifferenceMs = AnimationService.nowMs - startTimeMs;

      if (AnimationService.ended(timeDifferenceMs, durationMs)) {
        this.animationsList.clear(intervalId);
      }

      const timePhase = AnimationService.ended(timeDifferenceMs, durationMs)
        ? 1
        : timeDifferenceMs / durationMs;

      callback(timingFunction(timePhase));
    }, refreshTimeout);
    this.animationsList.add(intervalId, callback, options);

    return intervalId;
  }

  public interrupt(intervalId: number, interruptionMode: AnimationInterruptionMode = AnimationInterruptionMode.LeaveAsIs): void {
    this.animationsList.interrupt(intervalId, interruptionMode);
  }
}

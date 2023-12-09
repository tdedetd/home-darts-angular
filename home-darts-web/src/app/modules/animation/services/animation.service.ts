import { Injectable } from '@angular/core';
import { AnimateCallback } from '../models/animate-callback.type';
import { AnimationOptions } from '../models/animation-options.interface';
import { AnimationsList } from '../classes/animations-list';
import { AnimationInterruptionMode } from '../models/animation-interruption-mode.enum';

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

    callback(0);
    const intervalId = window.setInterval(() => {
      const timeDifferenceMs = AnimationService.nowMs - startTimeMs;

      if (AnimationService.ended(timeDifferenceMs, durationMs)) {
        this.animationsList.clear(intervalId);
      }

      const timePhase = AnimationService.ended(timeDifferenceMs, durationMs)
        ? 1
        : timeDifferenceMs / durationMs;

      const animationPhase = this.getAnimationPhase(timePhase);
      callback(animationPhase);
    }, refreshTimeout);
    this.animationsList.add(intervalId, callback, options);

    return intervalId;
  }

  public interrupt(intervalId: number, interruptionMode: AnimationInterruptionMode = AnimationInterruptionMode.LeaveAsIs): void {
    this.animationsList.interrupt(intervalId, interruptionMode);
  }

  private getAnimationPhase(timePhase: number): number {
    return timePhase;
  }
}

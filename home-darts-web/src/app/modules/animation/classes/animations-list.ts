import { AnimateCallback } from '../models/animate-callback.type';
import { AnimationInterruptionMode } from '../models/animation-interruption-mode.enum';
import { AnimationOptions } from '../models/animation-options.interface';

export class AnimationsList {
  private animations: Partial<Record<number, { callback: AnimateCallback, options: AnimationOptions }>> = {};

  public add(intervalId: number, callback: AnimateCallback, options: AnimationOptions): void {
    this.animations = {
      ...this.animations,
      [intervalId]: { callback, options },
    };
  }

  public clear(intervalId: number): void {
    clearInterval(intervalId);
    const { [intervalId]: _, ...animations } = this.animations;
    this.animations = animations;
  }

  public interrupt(
    intervalId: number,
    interruptionMode: AnimationInterruptionMode = AnimationInterruptionMode.LeaveAsIs
  ): void {
    if (interruptionMode === AnimationInterruptionMode.SetFinalState) {
      this.animations[intervalId]?.callback(1);
    } else if (interruptionMode === AnimationInterruptionMode.SetInitialState) {
      this.animations[intervalId]?.callback(0);
    }

    this.clear(intervalId);
  }
}

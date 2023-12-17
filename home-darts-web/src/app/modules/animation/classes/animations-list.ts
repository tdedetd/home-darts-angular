import { AnimateCallback } from '../models/animate-callback.type';
import { AnimationOptions } from '../models/animation-options.interface';
import { AnimationStates } from '../models/animation-states.enum';

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

  public interrupt(intervalId: number, setState: AnimationStates): void {
    if (setState === AnimationStates.Final) {
      this.animations[intervalId]?.callback(1);
    } else if (setState === AnimationStates.Initial) {
      this.animations[intervalId]?.callback(0);
    }

    this.clear(intervalId);
  }
}

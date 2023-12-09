import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { AnimationService } from '../services/animation.service';
import { Observable, Subject, distinctUntilChanged, startWith } from 'rxjs';
import { AnimatedPipeCallback } from '../models/animated-pipe-callback.type';
import { AnimationOptions } from '../models/animation-options.interface';

@Pipe({
  name: 'animated',
})
export class AnimatedPipe<T> implements PipeTransform, OnDestroy {
  private valueSubject = this.createSubject();
  private intervalId: number | null = null;

  constructor(private animationService: AnimationService) {}

  public ngOnDestroy(): void {
    this.clearAnimation();
  }

  public transform(value: T, callback: AnimatedPipeCallback<T>, options: AnimationOptions): Observable<T> {
    this.clearAnimation();
    this.intervalId = this.animationService.play((phase) => {
      this.valueSubject.next(callback(value, phase));
    }, options);

    return this.valueSubject.asObservable().pipe(
      startWith(value),
      distinctUntilChanged(),
    );
  }

  private clearAnimation(): void {
    this.valueSubject.complete();
    this.valueSubject = this.createSubject();

    if (this.intervalId !== null) {
      this.animationService.interrupt(this.intervalId);
    }
    this.intervalId = null;
  }

  private createSubject(): Subject<T> {
    return new Subject<T>();
  }
}

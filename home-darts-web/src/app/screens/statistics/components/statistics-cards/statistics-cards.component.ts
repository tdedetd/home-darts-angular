import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationOptions } from '@features/animation/models/animation-options.interface';
import { TimingFunctions } from '@features/animation/models/timing-functions.enum';
import { Store } from '@ngrx/store';
import { AnimatedPipeCallback } from '@features/animation/models/animated-pipe-callback.type';
import { selectStatisticsData } from '../../store/selectors/statistics-data.selector';
import { selectIsCountersAnimationsOn } from '../../../../store/selectors/is-counters-animations-on.selector';

@Component({
  selector: 'hd-statistics-cards',
  templateUrl: './statistics-cards.component.html',
  styleUrl: './statistics-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsCardsComponent {
  public isCounterAnimationsOn = this.store.selectSignal(selectIsCountersAnimationsOn);
  public stats = this.store.selectSignal(selectStatisticsData);

  public readonly animationOptions: AnimationOptions = {
    durationMs: 1000,
    timingFunction: TimingFunctions.EaseOutQuartic,
  };

  constructor(private store: Store) { }

  public animationPipeCallback: AnimatedPipeCallback<number> = (value, phase) => Math.round(value * phase);
}

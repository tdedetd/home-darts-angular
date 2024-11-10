import { Pipe, PipeTransform } from '@angular/core';
import { TimePart } from './models/time-part.interface';
import { TimeUnits } from './models/time-units.enum';

@Pipe({
  name: 'formatTimeInterval'
})
export class FormatTimeIntervalPipe implements PipeTransform {
  public transform(seconds: number): string {
    if (!seconds) {
      return `0${TimeUnits.Seconds}`;
    }

    return ([
      {
        unit: TimeUnits.Hours,
        value: Math.floor(seconds / 3600),
      },
      {
        unit: TimeUnits.Minutes,
        value: Math.floor(seconds % 3600 / 60)
      },
      {
        unit: TimeUnits.Seconds,
        value: Math.floor(seconds % 60),
      },
    ] as TimePart[])
      .filter(part => part.value)
      .map(part => `${part.value}${part.unit}`)
      .join(' ');
  }
}

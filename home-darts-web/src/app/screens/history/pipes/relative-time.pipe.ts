import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  private static readonly millisecondsInMinute = 1000 * 60;
  private static readonly millisecondsInHour = RelativeTimePipe.millisecondsInMinute * 60;
  private static readonly millisecondsInDay = RelativeTimePipe.millisecondsInHour * 24;

  public transform(dateJson1: string | Date, dateJson2: string | Date): string {
    const differenceMilliseconds = new Date(dateJson2).getTime() - new Date(dateJson1).getTime();

    // TODO: plural
    return differenceMilliseconds < RelativeTimePipe.millisecondsInMinute
      ? 'Just now'
      : differenceMilliseconds < RelativeTimePipe.millisecondsInHour
      ? `${Math.round(differenceMilliseconds / RelativeTimePipe.millisecondsInMinute)} minutes ago`
      : differenceMilliseconds < RelativeTimePipe.millisecondsInDay
      ? `${Math.round(differenceMilliseconds / RelativeTimePipe.millisecondsInHour)} hours ago`
      : formatDate(dateJson1, 'dd.MM.YYYY HH:mm', 'en-US');
  }
}

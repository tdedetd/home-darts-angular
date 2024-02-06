import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { pluralize } from '../../../modules/plural/utils/pluralize';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  private static readonly msInMinute = 1000 * 60;
  private static readonly msInHour = RelativeTimePipe.msInMinute * 60;
  private static readonly msInDay = RelativeTimePipe.msInHour * 24;

  public transform(dateJson1: string | Date, dateJson2: string | Date): string {
    const differenceMs = new Date(dateJson2).getTime() - new Date(dateJson1).getTime();

    if (differenceMs < RelativeTimePipe.msInMinute) {
      return 'Just now';
    } else if (differenceMs < RelativeTimePipe.msInHour) {
      const value = Math.round(differenceMs / RelativeTimePipe.msInMinute);
      return `${value} ${pluralize(value, ['minute', 'minutes'])} ago`;
    } else if (differenceMs < RelativeTimePipe.msInDay) {
      const value = Math.round(differenceMs / RelativeTimePipe.msInHour);
      return `${value} ${pluralize(value, ['hour', 'hours'])} ago`;
    } else {
      return formatDate(dateJson1, 'dd.MM.YYYY HH:mm', 'en-US');
    }
  }
}

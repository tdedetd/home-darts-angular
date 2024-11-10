import { Pipe, PipeTransform } from '@angular/core';
import { pluralize } from '../utils/pluralize';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
  public transform(quantity: number, forms: [string, string]): string {
    return pluralize(quantity, forms);
  }
}

import { NgModule } from '@angular/core';
import { PluralizePipe } from './pipes/pluralize.pipe';

@NgModule({
  declarations: [PluralizePipe],
  exports: [PluralizePipe],
})
export class PluralModule {}

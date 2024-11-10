import { NgModule } from '@angular/core';
import { FormatTimeIntervalPipe } from './format-time-interval.pipe';

@NgModule({
  declarations: [FormatTimeIntervalPipe],
  exports: [FormatTimeIntervalPipe]
})
export class FormatTimeIntervalModule { }

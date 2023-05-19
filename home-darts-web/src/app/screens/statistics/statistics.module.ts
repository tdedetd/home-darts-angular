import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { FormatTimeIntervalModule } from '../../modules/format-date-interval/format-time-interval.module';


@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatisticsRoutingModule,
    FormatTimeIntervalModule,
  ]
})
export class StatisticsModule { }

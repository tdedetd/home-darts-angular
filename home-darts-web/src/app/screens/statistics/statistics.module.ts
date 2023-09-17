import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { FormatTimeIntervalModule } from '../../modules/format-date-interval/format-time-interval.module';
import { AtcStatisticsComponent } from './components/atc-statistics/atc-statistics.component';
import { AtcStatsItemsPipe } from './pipes/atc-stats-items.pipe';


@NgModule({
  declarations: [
    StatisticsComponent,
    AtcStatisticsComponent,
    AtcStatsItemsPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatisticsRoutingModule,
    FormatTimeIntervalModule,
  ]
})
export class StatisticsModule { }

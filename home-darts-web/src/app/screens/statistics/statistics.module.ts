import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { FormatTimeIntervalModule } from '../../modules/format-date-interval/format-time-interval.module';
import { AtcStatisticsComponent } from './components/atc-statistics/atc-statistics.component';
import { AtcStatsItemsPipe } from './pipes/atc-stats-items.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    StatisticsComponent,
    AtcStatisticsComponent,
    AtcStatsItemsPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticsRoutingModule,
    FormatTimeIntervalModule,
    MatSelectModule,
  ]
})
export class StatisticsModule { }

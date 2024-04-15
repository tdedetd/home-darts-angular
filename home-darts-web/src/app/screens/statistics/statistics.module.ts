import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { FormatTimeIntervalModule } from '@modules/format-date-interval/format-time-interval.module';
import { AtcStatisticsComponent } from './components/atc-statistics/atc-statistics.component';
import { AtcStatsItemsPipe } from './pipes/atc-stats-items.pipe';
import { MatSelectModule } from '@angular/material/select';
import { AnimationModule } from '@modules/animation/animation.module';
import { StatisticsApiService } from './services/statistics-api.service';
import { AtcHitRateComponent } from './components/atc-hit-rate/atc-hit-rate.component';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { DartboardModule } from '@modules/dartboard/dartboard.module';


Chart.register(BarController, CategoryScale, LinearScale, BarElement);

@NgModule({
  declarations: [
    StatisticsComponent,
    AtcStatisticsComponent,
    AtcStatsItemsPipe,
    AtcHitRateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticsRoutingModule,
    FormatTimeIntervalModule,
    MatSelectModule,
    AnimationModule,
    DartboardModule,
  ],
  providers: [
    StatisticsApiService,
  ]
})
export class StatisticsModule { }

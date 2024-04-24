import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { FormatTimeIntervalModule } from '@modules/format-date-interval/format-time-interval.module';
import { AtcStatisticsComponent } from './components/atc-statistics/atc-statistics.component';
import { MatSelectModule } from '@angular/material/select';
import { AnimationModule } from '@modules/animation/animation.module';
import { StatisticsApiService } from './services/statistics-api.service';
import { AtcHitRateBarComponent } from './components/atc-hit-rate-bar/atc-hit-rate-bar.component';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { DartboardModule } from '@modules/dartboard/dartboard.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AtcHitRateHeatMapComponent } from './components/atc-hit-rate-heat-map/atc-hit-rate-heat-map.component';
import { AtcStatisticsCardComponent } from './components/atc-statistics-card/atc-statistics-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


Chart.register(BarController, CategoryScale, LinearScale, BarElement);

@NgModule({
  declarations: [
    StatisticsComponent,
    AtcStatisticsComponent,
    AtcHitRateBarComponent,
    AtcHitRateHeatMapComponent,
    AtcStatisticsCardComponent,
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
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [
    StatisticsApiService,
  ]
})
export class StatisticsModule { }

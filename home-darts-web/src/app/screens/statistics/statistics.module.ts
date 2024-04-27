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
import { AtcStatsCardItemsPipe } from './pipes/atc-stats-card-items.pipe';
import { StoreModule } from '@ngrx/store';
import { statisticsReducer } from './store/reducers';
import { StatisticsEffects } from './store/effects/statistics.effects';
import { EffectsModule } from '@ngrx/effects';


Chart.register(BarController, CategoryScale, LinearScale, BarElement);

@NgModule({
  declarations: [
    StatisticsComponent,
    AtcStatisticsComponent,
    AtcHitRateBarComponent,
    AtcHitRateHeatMapComponent,
    AtcStatisticsCardComponent,
    AtcStatsCardItemsPipe,
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
    StoreModule.forFeature('statistics', statisticsReducer),
    EffectsModule.forFeature([StatisticsEffects]),
  ],
  providers: [
    StatisticsApiService,
  ]
})
export class StatisticsModule { }

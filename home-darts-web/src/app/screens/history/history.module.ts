import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { HistoryApiService } from './services/history-api.service';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RelativeTimePipe } from './pipes/relative-time.pipe';


@NgModule({
  declarations: [
    HistoryComponent,
    HistoryItemComponent,
    RelativeTimePipe,
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [
    HistoryApiService,
  ]
})
export class HistoryModule { }

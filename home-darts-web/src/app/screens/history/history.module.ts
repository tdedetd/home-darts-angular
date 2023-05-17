import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { HistoryApiService } from './services/history-api.service';
import { HistoryItemComponent } from './components/history-item/history-item.component';


@NgModule({
  declarations: [
    HistoryComponent,
    HistoryItemComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ],
  providers: [
    HistoryApiService,
  ]
})
export class HistoryModule { }

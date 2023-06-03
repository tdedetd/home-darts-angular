import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AroundTheClockRoutingModule } from './around-the-clock-routing.module';
import { AroundTheClockApiService } from './service/around-the-clock-api.service';
import { AtcStartComponent } from './components/atc-start/atc-start.component';
import { AtcGameComponent } from './components/atc-game/atc-game.component';


@NgModule({
  declarations: [
    AtcStartComponent,
    AtcGameComponent,
  ],
  imports: [
    CommonModule,
    AroundTheClockRoutingModule,
  ],
  providers: [
    AroundTheClockApiService,
  ],
})
export class AroundTheClockModule { }

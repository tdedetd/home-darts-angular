import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AroundTheClockRoutingModule } from './around-the-clock-routing.module';
import { AroundTheClockComponent } from './around-the-clock.component';
import { AroundTheClockApiService } from './service/around-the-clock-api.service';


@NgModule({
  declarations: [
    AroundTheClockComponent,
  ],
  imports: [
    CommonModule,
    AroundTheClockRoutingModule,
  ],
  providers: [
    AroundTheClockApiService,
  ],
  // TODO: remove after adding routing
  exports: [AroundTheClockComponent]
})
export class AroundTheClockModule { }

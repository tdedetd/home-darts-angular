import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AroundTheClockRoutingModule } from './around-the-clock-routing.module';
import { AroundTheClockApiService } from './service/around-the-clock-api.service';
import { AtcStartComponent } from './components/atc-start/atc-start.component';
import { AtcGameIdParamGuard } from './guards/atc-game-id-param.guard';
import { StoreModule } from '@ngrx/store';
import { aroundTheClockReducer } from './store/reducers/around-the-clock.reducer';
import { AtcGameComponent } from './components/atc-game/atc-game.component';
import { AtcGameParticipantComponent } from './components/atc-game-participant/atc-game-participant.component';
import { EffectsModule } from '@ngrx/effects';
import { AroundTheClockEffects } from './store/effects/game-info.effects';


@NgModule({
  declarations: [
    AtcStartComponent,
    AtcGameComponent,
    AtcGameParticipantComponent,
  ],
  imports: [
    CommonModule,
    AroundTheClockRoutingModule,
    StoreModule.forFeature('aroundTheClock', aroundTheClockReducer),
    EffectsModule.forFeature([AroundTheClockEffects]),
  ],
  providers: [
    AroundTheClockApiService,
    AtcGameIdParamGuard,
  ],
})
export class AroundTheClockModule { }

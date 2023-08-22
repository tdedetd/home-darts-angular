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
import { AroundTheClockEffects } from './store/effects/around-the-clock.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplitButtonModule } from '@modules/split-button/split-button.module';
import { FilteredPlayersPipe } from './pipes/filtered-players.pipe';
import { AtcStartPlayersListComponent } from './components/atc-start-players-list/atc-start-players-list.component';
import { DartboardModule } from '../../modules/dartboard/dartboard.module';


@NgModule({
  declarations: [
    AtcStartComponent,
    AtcGameComponent,
    AtcGameParticipantComponent,
    FilteredPlayersPipe,
    AtcStartPlayersListComponent,
  ],
  imports: [
    CommonModule,
    AroundTheClockRoutingModule,
    StoreModule.forFeature('aroundTheClock', aroundTheClockReducer),
    EffectsModule.forFeature([AroundTheClockEffects]),
    FormsModule,
    ReactiveFormsModule,
    SplitButtonModule,
    DartboardModule,
  ],
  providers: [
    AroundTheClockApiService,
    AtcGameIdParamGuard,
  ],
})
export class AroundTheClockModule { }

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
import { FilteredPlayersPipe } from './pipes/filtered-players.pipe';
import { AtcStartPlayersListComponent } from './components/atc-start-players-list/atc-start-players-list.component';
import { DartboardModule } from '../../modules/dartboard/dartboard.module';
import { AtcVibrationService } from './service/atc-vibration.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


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
    DartboardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [
    AroundTheClockApiService,
    AtcGameIdParamGuard,
    AtcVibrationService,
  ],
})
export class AroundTheClockModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GameInfoEffects } from './store/effects/game-info.effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { reducers } from './store/reducers';
import { SettingsEffects } from './store/effects/settings.effects';
import { environment } from '../environments/environment';
import { MocksModule } from './modules/mocks/mocks.module';
import { CoreModule } from './modules/core/core.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GameInfoEffects, SettingsEffects]),
    StoreDevtoolsModule.instrument({ logOnly: true }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    ...(environment.mock ? [MocksModule] : []),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

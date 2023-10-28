import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GameInfoEffects } from './store/effects/game-info.effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkMenuModule } from '@angular/cdk/menu'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GameInfoEffects]),
    StoreDevtoolsModule.instrument({ logOnly: true }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CdkMenuModule,
    MatProgressBarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

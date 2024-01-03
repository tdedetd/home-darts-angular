import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavContainerComponent } from './components/sidenav-container/sidenav-container.component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { SettingsEffects } from './store/effects/settings.effects';
import { environment } from '../environments/environment';
import { MocksModule } from './modules/mocks/mocks.module';
import { CopyrightComponent } from './components/copyright/copyright.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavContainerComponent,
    SidenavMenuComponent,
    CopyrightComponent,
  ],
  imports: [
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
    CdkMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    ...(environment.mock ? [MocksModule] : []),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

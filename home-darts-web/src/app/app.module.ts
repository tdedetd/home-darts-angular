import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AroundTheClockModule } from './around-the-clock/around-the-clock.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    // TODO: routing
    AroundTheClockModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

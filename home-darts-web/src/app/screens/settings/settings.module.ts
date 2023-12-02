import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './settings-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule {}

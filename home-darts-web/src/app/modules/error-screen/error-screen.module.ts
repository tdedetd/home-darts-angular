import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorScreenComponent } from './error-screen.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ErrorScreenComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    ErrorScreenComponent
  ]
})
export class ErrorScreenModule { }

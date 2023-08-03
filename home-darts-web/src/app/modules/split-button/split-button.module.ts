import { NgModule } from '@angular/core';
import { SplitButtonComponent } from './split-button.component';
import { NgForOf } from '@angular/common';

@NgModule({
  declarations: [SplitButtonComponent],
  imports: [NgForOf],
  exports: [SplitButtonComponent]
})
export class SplitButtonModule { }

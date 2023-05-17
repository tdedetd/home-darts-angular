import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AroundTheClockComponent } from './around-the-clock.component';

const routes: Routes = [
  { path: '', component: AroundTheClockComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AroundTheClockRoutingModule { }

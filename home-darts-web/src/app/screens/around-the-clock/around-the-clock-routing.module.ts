import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtcStartComponent } from './components/atc-start/atc-start.component';
import { AtcGameComponent } from './components/atc-game/atc-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AtcStartComponent },
  { path: ':gameId', component: AtcGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AroundTheClockRoutingModule { }

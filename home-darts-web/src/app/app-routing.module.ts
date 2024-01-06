import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/core/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'around-the-clock',
    loadChildren: () => import('./screens/around-the-clock/around-the-clock.module').then(m => m.AroundTheClockModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./screens/history/history.module').then(m => m.HistoryModule),
  },
  {
    path: 'statistics',
    loadChildren: () => import('./screens/statistics/statistics.module').then(m => m.StatisticsModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./screens/settings/settings.module').then(m => m.SettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

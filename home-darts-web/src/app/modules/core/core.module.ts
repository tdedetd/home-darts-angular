import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavContainerComponent } from './components/sidenav-container/sidenav-container.component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidenavContainerComponent,
    SidenavMenuComponent,
    CopyrightComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    CdkMenuModule,
    MatButtonModule,
  ],
  exports: [
    HomeComponent,
    SidenavContainerComponent,
    SidenavMenuComponent,
    CopyrightComponent,
  ],
})
export class CoreModule { }

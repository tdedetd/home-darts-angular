import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { selectGlobalProgressBarShown } from './store/selectors/global-progress-bar-shown.selector';
import { closeSidenav, toggleSidenav } from './store/actions/sidenav-opened.actions';
import { NavigationEnd, Router } from '@angular/router';
import { loadSettings } from './store/actions/settings.actions';

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public isNotRoot$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(val => val.url !== '/'),
  );

  public progressBarShown$: Observable<boolean> = this.store.select(selectGlobalProgressBarShown);

  constructor(private store: Store, private router: Router) { }

  public ngOnInit(): void {
    this.store.dispatch(loadSettings());
  }

  public closeSidenav(): void {
    this.store.dispatch(closeSidenav());
  }

  public toggleMobileMenu(): void {
    this.store.dispatch(toggleSidenav());
  }
}

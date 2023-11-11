import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { selectGlobalProgressBarShown } from './store/selectors/global-progress-bar-shown.selector';
import { closeSidenav, toggleSidenav } from './store/actions/sidenav-opened.actions';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public isNotRoot$: Observable<boolean> = this.getIsNotRoot();
  public progressBarShown$: Observable<boolean> = this.store.select(selectGlobalProgressBarShown);

  constructor(private store: Store, private router: Router) { }

  public closeSidenav(): void {
    this.store.dispatch(closeSidenav());
  }

  public toggleMobileMenu(): void {
    this.store.dispatch(toggleSidenav());
  }

  private getIsNotRoot(): Observable<boolean> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(val => val.url !== '/'),
    );
  }
}

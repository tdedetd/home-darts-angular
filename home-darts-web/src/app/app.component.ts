import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { selectGlobalProgressBarShown } from './store/selectors/global-progress-bar-shown.selector';
import { closeSidenav, toggleSidenav } from './store/actions/sidenav-opened.actions';
import { NavigationEnd, Router } from '@angular/router';
import { loadSettings } from './store/actions/settings.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncorrectDisplayWarningService } from './services/incorrect-display-warning.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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

  public progressBarShown = this.store.selectSignal(selectGlobalProgressBarShown);

  constructor(
    private store: Store,
    private router: Router,
    private snackBar: MatSnackBar,
    private incorrectDisplayWarningService: IncorrectDisplayWarningService,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(loadSettings());
    this.initOpenIncorrectDisplayWarning();
  }

  public closeSidenav(): void {
    this.store.dispatch(closeSidenav());
  }

  public toggleMobileMenu(): void {
    this.store.dispatch(toggleSidenav());
  }

  private initOpenIncorrectDisplayWarning(): void {
    this.incorrectDisplayWarningService.loadState().pipe(
      filter(displayed => !displayed),
      untilDestroyed(this),
    ).subscribe(() => {
      this.snackBar.open(
        'Interface on desktop may be displayed incorrectly',
        'OK',
      );
      this.incorrectDisplayWarningService.markAsDisplayed();
    });
  }
}

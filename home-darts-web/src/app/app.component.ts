import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, debounceTime, filter, fromEvent } from 'rxjs';
import { selectGlobalProgressBarShown } from './store/selectors/global-progress-bar-shown.selector';
import { selectSidenavOpened } from './store/selectors/sidenav-opened.selector';
import { closeSidenav, toggleSidenav } from './store/actions/sidenav-opened.actions';
import { MatDrawer } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mobileBreakpoint } from './utils/constants/breakpoints/mobile-breakpoint';

@UntilDestroy()
@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChild(MatDrawer) drawer?: MatDrawer;

  public progressBarShown$: Observable<boolean> = this.store.select(selectGlobalProgressBarShown);

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.initToggleSidenav();
    this.initCloseMobileSidenavOnResize();
  }

  public closeSidenav(): void {
    this.store.dispatch(closeSidenav());
  }

  public toggleMobileMenu(): void {
    this.store.dispatch(toggleSidenav());
  }

  private initToggleSidenav(): void {
    this.store.select(selectSidenavOpened).pipe(
      untilDestroyed(this)
    ).subscribe(isOpened => {
      if (isOpened) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });
  }

  private initCloseMobileSidenavOnResize(): void {
    combineLatest([
      fromEvent(window, 'resize'),
      this.store.select(selectSidenavOpened),
    ]).pipe(
      debounceTime(300),
      filter(([_, isOpened]) => isOpened && window.innerWidth > mobileBreakpoint),
      untilDestroyed(this),
    ).subscribe(() => {
      this.closeSidenav();
    });
  }
}

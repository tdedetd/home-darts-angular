import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { closeSidenav } from '../../../../store/actions/sidenav-opened.actions';
import { selectSidenavOpened } from '../../../../store/selectors/sidenav-opened.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, filter, fromEvent } from 'rxjs';
import { mobileBreakpoint } from '@constants/breakpoints/mobile-breakpoint';

@UntilDestroy()
@Component({
  selector: 'hd-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavContainerComponent implements OnInit {
  @ViewChild(MatDrawer) public drawer?: MatDrawer;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.initToggleSidenav();
    this.initCloseMobileSidenavOnResize();
  }

  public closeSidenav(): void {
    this.store.dispatch(closeSidenav());
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
      this.cd.detectChanges();
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

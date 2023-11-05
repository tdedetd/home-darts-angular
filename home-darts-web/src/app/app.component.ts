import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGlobalProgressBarShown } from './store/selectors/global-progress-bar-shown.selector';
import { toggleSidenav } from './store/actions/sidenav-opened.actions';

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public progressBarShown$: Observable<boolean> = this.store.select(selectGlobalProgressBarShown);

  constructor(private store: Store) { }

  public toggleMobileMenu(): void {
    this.store.dispatch(toggleSidenav());
  }
}

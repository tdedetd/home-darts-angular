import { Injectable } from '@angular/core';
import { AroundTheClockState } from '../models/around-the-clock-state.interface';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';
import { selectTurnOverOnLastThrow } from '../store/selectors/turn-over-on-last-throw.selector';

@Injectable()
export class AtcVibrateService {
  private onTurnOver$ = this.store.select(selectTurnOverOnLastThrow).pipe(
    filter(Boolean),
    tap(() => navigator.vibrate(200)),
  );

  constructor(private store: Store<{ aroundTheClock: AroundTheClockState }>) { }

  public activate(): Observable<void> {
    return combineLatest([
      this.onTurnOver$
    ]).pipe(map(() => { return; }));
  }
}

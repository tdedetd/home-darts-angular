import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsService } from '../../services/settings.service';
import { loadSettings, settingsLoaded, updateSettings } from '../actions/settings.actions';
import { debounceTime, map, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SettingsEffects {
  public loadSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSettings),
      map(() => {
        const settings = this.settingsService.load();
        return settingsLoaded({ settings });
      }),
    );
  });

  public saveSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateSettings),
      debounceTime(1000),
      tap(({ settings }) => this.settingsService.save(settings)),
      tap(() => {
        this.snackBar.open(
          'Settings saved',
          'OK',
          { duration: 1500 }
        );
      }),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
  ) { }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsService } from '../../services/settings.service';
import { loadSettings, settingsLoaded, updateSettings } from '../actions/settings.actions';
import { debounceTime, map } from 'rxjs';

@Injectable()
export class SettingsEffects {
  public loadSettings$ = createEffect(() => this.actions$.pipe(
    ofType(loadSettings),
    map(() => {
      const settings = this.settingsService.load();
      return settingsLoaded({ settings });
    }),
  ));

  public updateSettings$ = createEffect(() => this.actions$.pipe(
    ofType(updateSettings),
    debounceTime(500),
    map(({ settings }) => this.settingsService.save(settings))
  ), { dispatch: false });

  constructor(private actions$: Actions, private settingsService: SettingsService) { }
}

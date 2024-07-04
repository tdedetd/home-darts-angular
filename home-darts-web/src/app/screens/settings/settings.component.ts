import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectSettings } from '../../store/selectors/settings.selector';
import { skip, take } from 'rxjs';
import { updateSettings } from '../../store/actions/settings.actions';
import { isSettings } from '@functions/type-guards/is-settings';
import { DartboardStyles } from '@models/enums/dartboard-styles.enum';
import { FormControlsOf } from '@models/types/form-controls-of.type';
import { SettingsState } from '@models/settings-state.interface';
import { dartboardStyleItems } from '@constants/dartboard-style-items';
import { Languages } from '@models/enums/languages.enum';

@UntilDestroy()
@Component({
  selector: 'hd-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  public readonly dartboardStyleItems = dartboardStyleItems;

  public form = this.fb.group<FormControlsOf<SettingsState>>({
    countersAnimations: this.fb.nonNullable.control(false, Validators.required),
    dartboardStyle: this.fb.nonNullable.control(DartboardStyles.Material, Validators.required),
    language: this.fb.nonNullable.control(Languages.English, Validators.required),
    sounds: this.fb.nonNullable.control(false, Validators.required),
    vibration: this.fb.nonNullable.control(false, Validators.required),
  });
  public readonly store = inject(Store);

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initFormValueChanges();
    this.loadSettings();
  }

  private initFormValueChanges(): void {
    this.form.valueChanges.pipe(skip(1), untilDestroyed(this)).subscribe(settings => {
      if (isSettings(settings)) {
        this.store.dispatch(updateSettings({ settings }));
      }
    });
  }

  private loadSettings(): void {
    this.store.select(selectSettings).pipe(
      take(1),
      untilDestroyed(this)
    ).subscribe(settings => {
      this.form.setValue(settings);
    });
  }
}

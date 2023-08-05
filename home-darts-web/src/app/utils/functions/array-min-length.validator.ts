import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const arrayMinLengthValidator = (length: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null =>
    control.value.length < length ? { arrayMinLength: true } : null;

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hd-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SplitButtonComponent),
    multi: true
  }]
})
export class SplitButtonComponent<T extends { label: string, value: string }> implements ControlValueAccessor {
  @Input() items: T[] = [];

  public onChange: ((item: T['value']) => void) | undefined;
  public onTouched: (() => void) | undefined;
  public value: T['value'] | undefined;

  private touched = false;

  constructor(private cdr: ChangeDetectorRef) { }

  public onClick(item: T): void {
    this.onChange?.(item.value);
    this.value = item.value;

    if (!this.touched) {
      this.touched = true;
      this.onTouched?.();
    }
    this.cdr.detectChanges();
  }

  public writeValue(value: T['value']): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  public registerOnChange(fn: (item: T['value']) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

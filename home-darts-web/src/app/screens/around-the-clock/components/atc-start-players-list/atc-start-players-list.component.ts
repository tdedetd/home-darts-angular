import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PlayerApi } from '@models/player-api.interface';

@Component({
  selector: 'hd-atc-start-players-list',
  templateUrl: './atc-start-players-list.component.html',
  styleUrls: ['./atc-start-players-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AtcStartPlayersListComponent),
    multi: true
  }]
})
export class AtcStartPlayersListComponent implements ControlValueAccessor {
  @Input() public players: PlayerApi[] = [];

  public onChange?: (item: PlayerApi['id'][]) => void;
  public onTouched?: () => void;
  public value: PlayerApi['id'][] = [];

  private touched = false;

  constructor(private cdr: ChangeDetectorRef) {}

  public onCloseClick({ id: playerId }: PlayerApi): void {
    this.updateValue(this.value.filter(id => id !== playerId));
  }

  public onItemChange({ id: playerId }: PlayerApi): void {
    this.updateValue([...this.value, playerId]);
  }

  public writeValue(value: PlayerApi['id'][]): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  public registerOnChange(fn: (item: PlayerApi['id'][]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private updateValue(value: PlayerApi['id'][]): void {
    this.onChange?.(value);
    // TODO: writeValue doesnt work. fix it
    this.value = value;

    if (!this.touched) {
      this.touched = true;
      this.onTouched?.();
    }
    this.cdr.detectChanges();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { PlayerApi } from '@models/player-api.interface';
import { shuffleList } from '@functions/shuffle-list';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
export class AtcStartPlayersListComponent implements OnInit, ControlValueAccessor {
  @Input() public players: PlayerApi[] = [];

  public onChange?: (item: PlayerApi['id'][]) => void;
  public onTouched?: () => void;
  public randomOrderControl = new FormControl<boolean>(false, { nonNullable: true, validators: Validators.required });
  public value: PlayerApi['id'][] = [];

  private touched = false;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.randomOrderControl.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.emitValue(this.value);
    });
  }

  public onCloseClick({ id: playerId }: PlayerApi): void {
    this.emitValue(this.value.filter(id => id !== playerId));
  }

  public onItemChange({ id: playerId }: PlayerApi): void {
    this.emitValue([...this.value, playerId]);
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

  private emitValue(value: PlayerApi['id'][]): void {
    this.onChange?.(this.randomOrderControl.value ? shuffleList(value) : value);

    // TODO: writeValue doesnt work. fix it
    this.value = value;

    if (!this.touched) {
      this.touched = true;
      this.onTouched?.();
    }
    this.cdr.detectChanges();
  }
}

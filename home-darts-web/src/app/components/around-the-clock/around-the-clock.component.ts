import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@UntilDestroy()
@Component({
  selector: 'app-around-the-clock',
  templateUrl: './around-the-clock.component.html',
  styleUrls: ['./around-the-clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AroundTheClockComponent {
  public get buttonsDisabled(): boolean {
    return this.loading || this.isCompleted;
  };

  public gameId: number | null = null;

  public nominal = 1;
  public errorDebug = '';
  public loading = false;
  public throws = 0;
  public hits = 0;
  public isCompleted = false;

  // TODO: config
  private readonly playerId = 1;

  private isForward = true;

  constructor(private cdr: ChangeDetectorRef, private api: ApiService) {}

  public onCompleteBtnClick(): void {
    if (this.gameId === null) return;

    this.api.complete(this.gameId, this.playerId)
      .pipe(
        catchError((err) => {
          this.loading = false;
          this.errorDebug = 'complete';
          this.cdr.detectChanges();
          return err;
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.loading = false;
        this.isCompleted = true;
        this.cdr.detectChanges();
      });
  }

  public onHit(): void {
    this.throw(this.nominal, true);
  }

  public onMiss(): void {
    this.throw(this.nominal, false);
  }

  public onUndo(): void {
    if (this.gameId === null) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.api.undo(this.gameId, this.playerId)
      .pipe(
        catchError((err) => {
          this.loading = false;
          this.errorDebug = 'undo';
          this.cdr.detectChanges();
          return err;
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.loading = false;

        // TODO: history

        this.cdr.detectChanges();
      });
  }

  public onStartBtnClick(): void {
    this.loading = true;

    this.api.start(this.playerId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: ({ gameId }) => {
          this.loading = false;
          this.gameId = gameId;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.errorDebug = 'start';
          this.cdr.detectChanges();
          return err;
        },
      });
  }

  private throw(nominal: number, hit: boolean): void {
    if (this.gameId === null) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.api.throw(nominal, hit, this.gameId, this.playerId)
      .pipe(
        catchError((err) => {
          this.loading = false;
          this.errorDebug = `throw - hit ${hit}`;
          this.cdr.detectChanges();
          return err;
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.loading = false;
        this.throws++;
        if (hit) {
          this.hits++;
          if (this.isForward) {
            if (nominal === 20) {
              this.nominal = 25;
            } else if (nominal === 25) {
              this.isForward = false;
              this.nominal = 20;
            } else {
              this.nominal++;
            }
          } else {
            this.nominal--;
          }
        }
        this.cdr.detectChanges();
      });
  }
}

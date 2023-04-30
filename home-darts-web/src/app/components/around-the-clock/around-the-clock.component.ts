import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-around-the-clock',
  templateUrl: './around-the-clock.component.html',
  styleUrls: ['./around-the-clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AroundTheClockComponent {
  public nominal = 1;
  public errorDebug = '';
  public loading = false;

  // temp
  private readonly gameId = 1;
  // temp
  private readonly playerId = 1;

  private readonly apiPrefix = 'http://192.168.0.104:3000/api/games/';
  private isForward = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  public onHit(): void {
    this.throw(this.nominal, true);
  }

  public onMiss(): void {
    this.throw(this.nominal, false);
  }

  public onUndo(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.http.delete(`${this.apiPrefix}${this.gameId}/undo`, { params: { playerId: this.playerId } })
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

  private throw(nominal: number, hit: boolean): void {
    this.loading = true;
    this.cdr.detectChanges();

    console.log('nominal', nominal);
    this.http.post(`${this.apiPrefix}${this.gameId}/throw`, { nominal, hit }, { params: { playerId: this.playerId } })
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
        if (hit) {
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

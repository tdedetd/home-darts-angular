import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError } from 'rxjs';
import { getSectionsForAroundTheClock } from './utils/functions/get-sections-for-around-the-clock';
import { GameDirections } from './models/game-directions.enum';
import { AroundTheClockApiService } from './service/around-the-clock-api.service';
import { GameParamTypes } from '../../models/game-param-types.enum';
import { SectionTypes } from '../../models/section-types.enum';

// TODO: provide game service
@UntilDestroy()
@Component({
  selector: 'hd-around-the-clock',
  templateUrl: './around-the-clock.component.html',
  styleUrls: ['./around-the-clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AroundTheClockComponent {
  public get buttonDisabled(): boolean {
    return this.loading || this.isCompleted;
  };

  public get currentSection(): number | undefined {
    return this.getSection(this.hits);
  }

  public gameId: number | null = null;

  public errorDebug = '';
  public loading = false;
  public throws = 0;
  public hits = 0;
  public isCompleted = false;

  private sections = getSectionsForAroundTheClock(GameDirections.ForwardBackward, true);

  constructor(private cdr: ChangeDetectorRef, private api: AroundTheClockApiService) {}

  public getSection(index: number): number | undefined {
    return this.sections[index];
  }

  public onCompleteBtnClick(): void {
    if (this.gameId === null) return;

    this.api.complete(this.gameId)
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
    this.throw(this.currentSection, true);
  }

  public onMiss(): void {
    this.throw(this.currentSection, false);
  }

  public onUndo(): void {
    if (this.gameId === null) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.api.undo(this.gameId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (deletedThrow) => {
          this.loading = false;

          if (deletedThrow) {
            this.throws--;
            if (deletedThrow.hit) this.hits--;
          }

          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.errorDebug = 'undo';
          this.cdr.detectChanges();
          return err;
        }
      });
  }

  public onStartBtnClick(): void {
    this.loading = true;

    this.api.start({
      [GameParamTypes.Direction]: GameDirections.ForwardBackward,
      [GameParamTypes.FastGame]: false,
      [GameParamTypes.HitDetection]: SectionTypes.Any,
      [GameParamTypes.IncludeBull]: true,
    })
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

  private throw(nominal: number | undefined, hit: boolean): void {
    if (this.gameId === null || typeof nominal === 'undefined') return;

    this.loading = true;
    this.cdr.detectChanges();

    this.api.throw(nominal, hit, this.gameId)
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
        if (hit) this.hits++;
        this.cdr.detectChanges();
      });
  }
}

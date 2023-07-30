import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AroundTheClockApiService } from '../../service/around-the-clock-api.service';
import { GameDirections } from '../../models/game-directions.enum';
import { SectionTypes } from '@models/section-types.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultPlayerId } from '@config';

@UntilDestroy()
@Component({
  selector: 'hd-atc-start',
  templateUrl: './atc-start.component.html',
  styleUrls: ['./atc-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStartComponent {
  public loading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private atcApi: AroundTheClockApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  public onStartBtnClick(): void {
    this.loading = true;

    this.atcApi.start({
      direction: GameDirections.ForwardBackward,
      fastGame: false,
      hitDetection: SectionTypes.Any,
      includeBull: true
    }, defaultPlayerId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: ({ gameId }) => {
          this.router.navigate([`./${gameId}`], { relativeTo: this.activatedRoute });
        },
        error: (err) => {
          this.loading = false;
          this.cdr.detectChanges();
          return err;
        },
      });
  }
}

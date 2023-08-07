import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AroundTheClockApiService } from '../../service/around-the-clock-api.service';
import { GameDirections } from '../../models/game-directions.enum';
import { SectionTypes } from '@models/section-types.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultPlayerId } from '@config';
import { FormBuilder } from '@angular/forms';
import { gameDirectionItems } from '../../utils/constants/game-direction-items';
import { sectionTypes } from '../../utils/constants/section-types';
import { PlayerApiService } from '../../../../services/player-api.service';
import { Observable } from 'rxjs';
import { PlayerApi } from '@models/player-api.interface';
import { arrayMinLengthValidator } from '../../../../utils/functions/array-min-length.validator';

@UntilDestroy()
@Component({
  selector: 'hd-atc-start',
  templateUrl: './atc-start.component.html',
  styleUrls: ['./atc-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcStartComponent {
  public readonly gameDirectionItems = gameDirectionItems;
  public readonly sectionTypes = sectionTypes;
  public readonly players$: Observable<PlayerApi[]> = this.playerApi.getPlayers();

  public form = this.fb.group({
    players: this.fb.nonNullable.control<PlayerApi['id'][]>([defaultPlayerId], arrayMinLengthValidator(1)),
    direction: this.fb.nonNullable.control<GameDirections>(GameDirections.ForwardBackward),
    fastGame: this.fb.nonNullable.control<boolean>(false),
    hitDetection: this.fb.nonNullable.control<SectionTypes>(SectionTypes.Any),
    includeBull: this.fb.nonNullable.control<boolean>(true),
  });
  public loading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private atcApi: AroundTheClockApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private playerApi: PlayerApiService,
  ) { }

  public submit(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.atcApi.start(this.form.getRawValue())
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

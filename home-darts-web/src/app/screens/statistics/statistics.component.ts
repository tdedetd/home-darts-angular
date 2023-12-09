import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, switchMap } from 'rxjs';
import { PlayerApi } from '@models/player-api.interface';
import { PlayerApiService } from '../../services/player-api.service';
import { AnimatedPipeCallback } from '../../modules/animation/models/animated-pipe-callback.type';
import { AnimationOptions } from '../../modules/animation/models/animation-options.interface';

@Component({
  selector: 'hd-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  public readonly players$: Observable<PlayerApi[]> = this.playerApi.getPlayers();
  public readonly playerControl = new FormControl<PlayerApi | null>(null);

  public readonly stats$ = this.playerControl.valueChanges.pipe(
    filter(Boolean),
    switchMap(player => this.playerApi.getPlayerStats(player?.id)),
  );

  public animationPipeCallback: AnimatedPipeCallback<number> = (value, phase) => Math.floor(value * phase);
  public animationOptions: AnimationOptions = {
    durationMs: 1000,
    refreshTimeout: 10,
  };

  constructor(private playerApi: PlayerApiService) { }
}

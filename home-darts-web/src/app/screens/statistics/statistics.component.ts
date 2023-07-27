import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter, switchMap } from 'rxjs';
import { PlayerApi } from '@models/player-api.interface';
import { PlayerStatsApi } from '@models/player-stats-api.interface';
import { PlayerApiService } from '../../services/player-api.service';

@Component({
  selector: 'hd-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  public readonly players$: Observable<PlayerApi[]> = this.playerApi.getPlayers();
  public readonly playerControl = new FormControl<PlayerApi | null>(null);
  public readonly stats$ = this.getStats();

  constructor(private playerApi: PlayerApiService) {}

  private getStats(): Observable<PlayerStatsApi> {
    return this.playerControl.valueChanges.pipe(
      filter(Boolean),
      switchMap(player => this.playerApi.getPlayerStats(player!.id)),
    );
  }
}

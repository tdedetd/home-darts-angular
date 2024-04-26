import { Pipe, PipeTransform } from '@angular/core';
import { getAtcStatsCardItems } from '../utils/get-atc-stats-card-items';
import { PlayerStatsApi } from '../../../models/player-stats-api.interface';
import { AtcStatisticsCardData } from '../models/atc-statistics-card-data.interface';

@Pipe({
  name: 'atcStatsCardItems'
})
export class AtcStatsCardItemsPipe implements PipeTransform {
  public transform(stats: PlayerStatsApi['aroundTheClock']): AtcStatisticsCardData[] {
    return getAtcStatsCardItems(stats);
  }
}

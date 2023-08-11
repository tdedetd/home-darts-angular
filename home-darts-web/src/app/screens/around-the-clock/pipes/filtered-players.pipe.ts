import { Pipe, PipeTransform } from '@angular/core';
import { PlayerApi } from '@models/player-api.interface';
import { isNotEmpty } from '@functions/is-not-empty';

@Pipe({
  name: 'filteredPlayers'
})
export class FilteredPlayersPipe implements PipeTransform {
  public transform(players: PlayerApi[], relation: 'only' | 'exclude', playerIds: PlayerApi['id'][]): PlayerApi[] {
    return relation === 'only'
      ? playerIds.map(playerId => players.find(({ id }) => id === playerId)).filter(isNotEmpty)
      : players.filter(({ id }) => !playerIds.includes(id));
  }
}

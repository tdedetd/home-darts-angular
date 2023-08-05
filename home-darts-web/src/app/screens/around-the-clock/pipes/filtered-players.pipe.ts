import { Pipe, PipeTransform } from '@angular/core';
import { PlayerApi } from '@models/player-api.interface';
import { isNotNil } from '../../../utils/functions/is-not-nil';

@Pipe({
  name: 'filteredPlayers'
})
export class FilteredPlayersPipe implements PipeTransform {
  public transform(players: PlayerApi[], relation: 'only' | 'remove', playerIds: PlayerApi['id'][]): PlayerApi[] {
    return relation === 'only'
      ? playerIds.map(playerId => players.find(({ id }) => id === playerId)).filter(isNotNil)
      : players.filter(({ id }) => !playerIds.includes(id));
  }
}

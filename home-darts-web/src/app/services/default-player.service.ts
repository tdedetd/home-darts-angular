import { Injectable } from '@angular/core';
import { PlayerApi } from '@models/player-api.interface';

@Injectable({
  providedIn: 'root'
})
export class DefaultPlayerService {
  private key = 'defaulrPlayer';

  public load(): number | null {
    const value = localStorage.getItem(this.key);
    if (value === null) {
 return null;
}

    const valueNumber = Number(value);
    return Number.isNaN(valueNumber) ? null : valueNumber;
  }

  public save(playerId: PlayerApi['id']): void {
    localStorage.setItem(this.key, String(playerId));
  }
}

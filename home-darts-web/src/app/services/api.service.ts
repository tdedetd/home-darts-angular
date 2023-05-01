import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiPrefix = 'http://192.168.0.104:3000/api/games/';

  constructor(private http: HttpClient) {}

  public complete(gameId: number, playerId: number): Observable<void> {
    return this.http.put<void>(`${this.apiPrefix}${gameId}/complete`, null, { params: { playerId }});
  }

  public start(playerId: number): Observable<{ gameId: number }> {
    return this.http.post<{ gameId: number }>(`${this.apiPrefix}start`, null, { params: { playerId }});
  }

  public throw(nominal: number, hit: boolean, gameId: number, playerId: number): Observable<void> {
    return this.http.post<void>(`${this.apiPrefix}${gameId}/throw`, { nominal, hit }, { params: { playerId } });
  }

  public undo(gameId: number, playerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPrefix}${gameId}/undo`, { params: { playerId } });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiPrefix, playerId } from 'src/app/config';

@Injectable()
export class AroundTheClockApiService {
  private readonly apiPrefix = `${apiPrefix}games/around-the-clock/`;

  constructor(private http: HttpClient) {}

  public complete(gameId: number): Observable<void> {
    return this.http.put<void>(`${this.apiPrefix}${gameId}/complete`, null, { params: { playerId }});
  }

  public start(): Observable<{ gameId: number }> {
    return this.http.post<{ gameId: number }>(`${this.apiPrefix}start`, null, { params: { playerId }});
  }

  public throw(nominal: number, hit: boolean, gameId: number): Observable<void> {
    return this.http.post<void>(`${this.apiPrefix}${gameId}/throw`, { nominal, hit }, { params: { playerId } });
  }

  public undo(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPrefix}${gameId}/undo`, { params: { playerId } });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPrefix } from '@config';
import { Observable } from 'rxjs';
import { ThrowsGrouped } from '../models/throws-grouped.interface';
import { ThrowApi } from '../models/throw-api.interface';

@Injectable({ providedIn: 'root' })
export class ThrowsApiService {
  private readonly throwsApiUrl = `${apiPrefix}throws/`;

  constructor(private http: HttpClient) {}

  // TODO: make mock!!!!
  public getThrows(gameId: number, page: number, size: number): Observable<ThrowApi[]> {
    return this.http.get<ThrowApi[]>(`${this.throwsApiUrl}${gameId}`, {
      params: { page, size }
    });
  }

  public getThrowsGrouped(gameId: number): Observable<ThrowsGrouped[]> {
    return this.http.get<ThrowsGrouped[]>(`${this.throwsApiUrl}grouped/${gameId}`);
  }
}

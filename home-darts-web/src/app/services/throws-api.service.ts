import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPrefix } from '@config';
import { Observable } from 'rxjs';
import { ThrowsGrouped } from '../models/throws-grouped.interface';
import { ThrowApi } from '../models/throw-api.interface';
import { PaginationParams } from '@models/pagination-params.interface';
import { isNotEmpty } from '../utils/functions/type-guards/is-not-empty';

@Injectable({ providedIn: 'root' })
export class ThrowsApiService {
  private readonly throwsApiUrl = `${apiPrefix}throws/`;

  constructor(private http: HttpClient) {}

  public getThrows(gameId: number, pagination: PaginationParams, playerId?: number): Observable<ThrowApi[]> {
    return this.http.get<ThrowApi[]>(`${this.throwsApiUrl}${gameId}`, {
      params: {
        ...pagination,
        ...(isNotEmpty(playerId) ? { playerId } : {})
      }
    });
  }

  public getThrowsGrouped(gameId: number): Observable<ThrowsGrouped[]> {
    return this.http.get<ThrowsGrouped[]>(`${this.throwsApiUrl}grouped/${gameId}`);
  }
}

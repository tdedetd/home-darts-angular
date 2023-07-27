import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPrefix } from '@config';
import { Observable } from 'rxjs';
import { ThrowsGrouped } from '../models/throws-grouped';

@Injectable({ providedIn: 'root' })
export class ThrowsApiService {
  private readonly throwsApiUrl = `${apiPrefix}throws/`;

  constructor(private http: HttpClient) {}

  public getThrowsGrouped(gameId: number): Observable<ThrowsGrouped[]> {
    return this.http.get<ThrowsGrouped[]>(`${this.throwsApiUrl}grouped/${gameId}`);
  }
}

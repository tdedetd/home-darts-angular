import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPrefix, playerId } from 'src/app/config';
import { PaginationParams } from 'src/app/models/pagination-params.interface';
import { HistoryApi } from '../models/history-api.interface';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryApiService {
  private readonly apiPrefix = `${apiPrefix}history/`;

  constructor(private http: HttpClient) {}

  public getHistory(params?: PaginationParams): Observable<HistoryApi[]> {
    return this.http.get<HistoryApi[]>(this.apiPrefix, { params: { ...params, playerId } });
  }
}

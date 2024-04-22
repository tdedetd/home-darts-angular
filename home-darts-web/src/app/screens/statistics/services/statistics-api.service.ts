import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerApi } from '@models/player-api.interface';
import { Observable } from 'rxjs';
import { aroundTheClockApiUrl } from '@constants/urls/around-the-clock-api-url';
import { AroundTheClockParams } from '../../around-the-clock/models/around-the-clock-params.interface';
import { HitRate } from '../models/hit-rate.interface';

@Injectable()
export class StatisticsApiService {
  private readonly apiPrefix = aroundTheClockApiUrl;

  constructor(private http: HttpClient) {}

  // TODO: params typing
  public hitRate(playerId: PlayerApi['id'], params: Partial<AroundTheClockParams>): Observable<HitRate[]> {
    return this.http.get<HitRate[]>(`${this.apiPrefix}hit-rate`, { params: {
      ...params,
      playerId,
    }});
  }
}

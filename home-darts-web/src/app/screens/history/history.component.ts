import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HistoryApiService } from './services/history-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HistoryApi } from './models/history-api.interface';

@UntilDestroy()
@Component({
  selector: 'hd-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {

  public games: HistoryApi[] = [];
  public showMoreButton = true;

  private readonly size = 10;
  private page = 0;

  constructor(private api: HistoryApiService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loadMore();
  }

  public loadMore(): void {
    this.api.getHistory({
      page: this.page,
      size: this.size,
    }).pipe(untilDestroyed(this)).subscribe(games => {
      this.games = [...this.games, ...games];
      this.page++;
      if (!games.length) {
        this.showMoreButton = false;
      }
      this.cdr.detectChanges();
    });
  }
}

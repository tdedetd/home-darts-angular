import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import { sectionsInOrder } from '@constants/sections-in-order';
import { HitRate } from '../../models/hit-rate.interface';
import { palette } from '@constants/palette';
import { ReplaySubject, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'hd-atc-hit-rate',
  templateUrl: './atc-hit-rate.component.html',
  styleUrls: ['./atc-hit-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcHitRateComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') public canvas?: ElementRef<HTMLCanvasElement>;

  @Input() public set data(value: HitRate[]) {
    this.dataSubject.next(value);
  }

  private chart?: Chart;
  private dataSubject = new ReplaySubject<HitRate[]>(1);

  public ngOnInit(): void {
    this.initUpdateData();
  }

  public ngAfterViewInit(): void {
    const canvas = this.canvas?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: this.getData([]),
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            events: [],
          }
        });
      }
    }

    this.listenResize();
  }

  private getData(data: HitRate[]): ChartData {
    const hitRateValues = sectionsInOrder.map(sector => {
      const hitRateRecord = data.find(record => record.sector === sector);
      return hitRateRecord && hitRateRecord.throws ? (hitRateRecord.hits / hitRateRecord.throws * 100) : 0;
    });

    return {
      labels: sectionsInOrder,
      datasets: [{
        data: hitRateValues,
        backgroundColor: palette.blue,
        borderWidth: 0,
        barPercentage: 0.5,
      }],
    }
  }

  private initUpdateData(): void {
    this.dataSubject.pipe(
      distinctUntilChanged(),
      debounceTime(0),
      untilDestroyed(this)
    ).subscribe(data => {
      if (this.chart) {
        this.chart.data = this.getData(data);
        this.chart.update();
      }
    });
  }

  private listenResize(): void {
    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      untilDestroyed(this),
    ).subscribe(() => {
      if (this.chart) {
        this.chart.update();
      }
    });
  }
}

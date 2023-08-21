import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SectionTypes } from '@models/section-types.enum';
import { DartboardRenderer } from './classes/dartboard-renderer.class';

@Component({
  selector: 'hd-dartboard',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DartboardComponent implements AfterViewInit {
  @ViewChild('dartboard') dartboard!: ElementRef<HTMLCanvasElement>;

  @Input() sector: number = 25;
  @Input() sectorType: SectionTypes = SectionTypes.Any;

  private dartboardRenderer?: DartboardRenderer;
  private renderQuality = 1;

  constructor() { }

  public ngAfterViewInit(): void {
    const context = this.dartboard.nativeElement.getContext('2d');
    this.dartboard.nativeElement.width = this.dartboard.nativeElement.clientWidth;
    this.dartboard.nativeElement.height = this.dartboard.nativeElement.clientWidth;
    if (context) {
      this.dartboardRenderer = new DartboardRenderer(context, 0, 0);
    }
    this.updateCanvasResolution = this.updateCanvasResolution.bind(this);
    new ResizeObserver(this.updateCanvasResolution).observe(this.dartboard.nativeElement);
  }

  private updateCanvasResolution(): void {
    this.dartboard.nativeElement.width = this.dartboard.nativeElement.clientWidth * this.renderQuality;
    this.dartboard.nativeElement.height = this.dartboard.nativeElement.clientWidth * this.renderQuality;
    const { width, height } = this.dartboard.nativeElement;
    this.dartboardRenderer?.updateRenderResolution(width, height);
    this.dartboardRenderer?.render();
  }
}

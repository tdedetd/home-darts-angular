import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { SectionTypes } from '@models/section-types.enum';
import { DartboardRenderer } from './classes/dartboard-renderer.class';

@Component({
  selector: 'hd-dartboard',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DartboardComponent implements OnChanges, AfterViewInit {
  @ViewChild('dartboard') dartboard!: ElementRef<HTMLCanvasElement>;

  @Input() sector = 0;
  @Input() sectorType: SectionTypes = SectionTypes.Any;

  private dartboardRenderer?: DartboardRenderer;
  private renderQuality = 1;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    const sectorChange = changes['sector'];
    const sectorTypeChange = changes['sectorType'];
    if (sectorChange && sectorChange.currentValue !== sectorChange.previousValue ||
      sectorTypeChange && sectorTypeChange.currentValue !== sectorTypeChange.previousValue) {

      this.dartboardRenderer?.focusSector(this.sector, this.sectorType);
    }
  }

  public ngAfterViewInit(): void {
    const el = this.dartboard.nativeElement;
    const context = el.getContext('2d');
    if (context) {
      el.width = el.clientWidth;
      el.height = el.clientWidth;
      this.dartboardRenderer = new DartboardRenderer(context, 0, 0);
      this.dartboardRenderer.focusSector(this.sector, this.sectorType);
      this.updateCanvasResolution = this.updateCanvasResolution.bind(this);
      new ResizeObserver(this.updateCanvasResolution).observe(el);
    }
  }

  private updateCanvasResolution(): void {
    if (!this.dartboardRenderer) return;

    this.dartboard.nativeElement.width = this.dartboard.nativeElement.clientWidth * this.renderQuality;
    this.dartboard.nativeElement.height = this.dartboard.nativeElement.clientWidth * this.renderQuality;
    const { width, height } = this.dartboard.nativeElement;
    this.dartboardRenderer.updateRenderResolution(width, height);
    this.dartboardRenderer.render();
  }
}

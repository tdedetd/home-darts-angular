import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  input,
  viewChild
} from '@angular/core';
import { SectionTypes } from '@models/enums/section-types.enum';
import { DartboardRenderer } from './classes/dartboard-renderer.class';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { DartboardStyles } from '@models/enums/dartboard-styles.enum';
import { dartboardStyleMapper } from './constants/dartboard-style-mapper';
import { DartboardStyle } from './models/dartboard-style.interface';
import { isDartboardStyle } from './utils/is-dartboard-style';

@Component({
  selector: 'hd-dartboard',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DartboardComponent implements OnChanges, AfterViewInit, OnDestroy {
  public dartboard = viewChild.required<ElementRef<HTMLCanvasElement>>('dartboard');

  public sector = input<DartboardSector>(0);
  public sectorType = input<SectionTypes>(SectionTypes.Any);
  public style = input<DartboardStyles | DartboardStyle | null>(DartboardStyles.Material);
  public zoom = input(true);

  private dartboardRenderer?: DartboardRenderer;
  private renderQuality = 2;
  private resizeObserver?: ResizeObserver;

  public ngOnChanges(changes: SimpleChanges): void {
    const sectorChange = changes['sector'];
    const sectorTypeChange = changes['sectorType'];
    const styleChange = changes['style'];

    if (sectorChange && sectorChange.currentValue !== sectorChange.previousValue ||
      sectorTypeChange && sectorTypeChange.currentValue !== sectorTypeChange.previousValue) {

      this.dartboardRenderer?.focusSector(this.sector(), this.sectorType(), this.zoom());
    }

    if (styleChange && styleChange.currentValue !== styleChange.previousValue) {
      this.initDartboard();
    }
  }

  public ngAfterViewInit(): void {
    this.initDartboard();
  }

  public ngOnDestroy(): void {
    this.unobserveResizeObserver();
  }

  private initDartboard(): void {
    this.unobserveResizeObserver();
    const style = this.style();
    if (!style || !this.dartboard) {
      return;
    }

    const el = this.dartboard().nativeElement;
    const context = el.getContext('2d');
    if (context) {
      el.width = el.clientWidth;
      el.height = el.clientWidth;
      this.dartboardRenderer = new DartboardRenderer(
        context, 0, 0, isDartboardStyle(style) ? style : dartboardStyleMapper[style]
      );
      this.dartboardRenderer.focusSector(this.sector(), this.sectorType(), this.zoom());
      this.updateCanvasResolution = this.updateCanvasResolution.bind(this);
      new ResizeObserver(this.updateCanvasResolution).observe(el);
    }
  }

  private updateCanvasResolution(): void {
    if (!this.dartboardRenderer || !this.dartboard) {
      return;
    }

    const dartboardElement = this.dartboard().nativeElement;
    const renderWidth = dartboardElement.clientWidth * this.renderQuality;
    dartboardElement.width = renderWidth;
    dartboardElement.height = renderWidth;
    const { width, height } = dartboardElement;

    this.dartboardRenderer.updateRenderResolution(width, height);
    this.dartboardRenderer.render();
  }

  private unobserveResizeObserver(): void {
    if (!this.dartboard) {
      return;
    }
    const el = this.dartboard().nativeElement;
    this.resizeObserver?.unobserve(el);
  }
}

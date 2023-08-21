import { sectionsClockwise } from '@constants/sections-clockwise';
import { GameToRenderSizeConverter } from './game-to-render-size-converter.class';
import { dartboardRealSizesMm } from '../constants/dartboard-real-sizes';
import { DartboardPalette } from '../models/dartboard-palette.enum';

const gameOuterRadius = 0.49;

export class DartboardRenderer {
  private readonly renderSizeConverter: GameToRenderSizeConverter = new GameToRenderSizeConverter();
  private readonly context: CanvasRenderingContext2D;
  private renderLength!: number;

  private readonly data = {
    dartboardCenter: { x: 0.5, y: 0.5 },
    sectors: sectionsClockwise,
    radiuses: {
      outer: gameOuterRadius,
      trippleRingOuter: this.getGameSize(dartboardRealSizesMm.radius.tripples),
      trippleRingInner: this.getGameSize(dartboardRealSizesMm.radius.tripples - dartboardRealSizesMm.ringWidth),
      doubleRingOuter: this.getGameSize(dartboardRealSizesMm.radius.doubles),
      doubleRingInner: this.getGameSize(dartboardRealSizesMm.radius.doubles - dartboardRealSizesMm.ringWidth),
      bullOuter: this.getGameSize(dartboardRealSizesMm.diameter.outerBull / 2),
      bullInner: this.getGameSize(dartboardRealSizesMm.diameter.innerBull / 2),
    }
  };

  private readonly degreesPerSector = 360 / this.data.sectors.length;
  private readonly degreesStart = -90 + this.degreesPerSector / 2;
  private readonly radiansPerSector = this.degreesPerSector * Math.PI / 180;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.updateRenderResolution(width, height);
  }

  public render(): void {
    this.renderCircleInCenter(DartboardPalette.Black, this.data.radiuses.outer);

    this.data.sectors.forEach((sector, index) => {
      this.renderSector(sector, index);
    });

    this.renderCircleInCenter(DartboardPalette.Green, this.data.radiuses.bullOuter);
    this.renderCircleInCenter(DartboardPalette.Red, this.data.radiuses.bullInner);
  }

  public updateRenderResolution(width: number, height: number): void {
    if (width !== height) throw new Error('cannot create DartboardRenderer: width !== height');
    this.renderLength = width;
    this.renderSizeConverter.setRenderLength(this.renderLength);
  }

  private getGameSize(realSize: number): number {
    return realSize * gameOuterRadius / (dartboardRealSizesMm.diameter.outer / 2);
  }

  private renderCircleInCenter(color: DartboardPalette, radius: number): void {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.ellipse(
      this.renderSizeConverter.size(this.data.dartboardCenter.x),
      this.renderSizeConverter.size(this.data.dartboardCenter.y),
      this.renderSizeConverter.size(radius),
      this.renderSizeConverter.size(radius),
      0, 0, Math.PI * 2
    );
    this.context.fill();
  }

  private renderSector(sector: number, index: number): void {
    const degrees = this.degreesStart + (this.degreesPerSector * index);
    const radians = degrees * Math.PI / 180;

    const ringsColor = index % 2 === 0 ? DartboardPalette.Green : DartboardPalette.Red;
    const singleColor = index % 2 === 0 ? DartboardPalette.White : DartboardPalette.Black;

    this.renderSectorPart(ringsColor, radians, this.data.radiuses.trippleRingOuter, this.data.radiuses.trippleRingInner);
    this.renderSectorPart(singleColor, radians, this.data.radiuses.trippleRingInner, this.data.radiuses.doubleRingOuter);
    this.renderSectorPart(ringsColor, radians, this.data.radiuses.doubleRingOuter, this.data.radiuses.doubleRingInner);
    this.renderSectorPart(singleColor, radians, this.data.radiuses.doubleRingInner, this.data.radiuses.bullOuter);
  }

  private renderSectorPart(
    color: DartboardPalette,
    rotationRad: number,
    outerRadius: number,
    innerRadius: number,
  ): void {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.ellipse(
      this.renderSizeConverter.size(this.data.dartboardCenter.x),
      this.renderSizeConverter.size(this.data.dartboardCenter.y),
      this.renderSizeConverter.size(outerRadius),
      this.renderSizeConverter.size(outerRadius),
      rotationRad,
      0,
      this.radiansPerSector,
    );
    this.context.ellipse(
      this.renderSizeConverter.size(this.data.dartboardCenter.x),
      this.renderSizeConverter.size(this.data.dartboardCenter.y),
      this.renderSizeConverter.size(innerRadius),
      this.renderSizeConverter.size(innerRadius),
      rotationRad,
      this.radiansPerSector,
      0,
      true
    );
    this.context.fill();
  }
}

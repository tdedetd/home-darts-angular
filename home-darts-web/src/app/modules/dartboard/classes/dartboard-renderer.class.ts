import { sectionsClockwise } from '@constants/sections-clockwise';
import { GameToRenderSizeConverter } from './game-to-render-size-converter.class';
import { dartboardRealSizesMm } from '../constants/dartboard-real-sizes';
import { DartboardPalette } from '../models/dartboard-palette.enum';
import { CoordinateSystemConverter } from './coordinate-system-converter.class';
import { Point } from '../models/point.interface';
import { getSingleOrDoubleDigit } from '../utils/get-single-or-double-digit';

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
      labels: this.getGameSize((dartboardRealSizesMm.radius.doubles + dartboardRealSizesMm.diameter.outer / 2) / 2),
      doubleRingOuter: this.getGameSize(dartboardRealSizesMm.radius.doubles),
      doubleRingInner: this.getGameSize(dartboardRealSizesMm.radius.doubles - dartboardRealSizesMm.ringWidth),
      trippleRingOuter: this.getGameSize(dartboardRealSizesMm.radius.tripples),
      trippleRingInner: this.getGameSize(dartboardRealSizesMm.radius.tripples - dartboardRealSizesMm.ringWidth),
      bullOuter: this.getGameSize(dartboardRealSizesMm.diameter.outerBull / 2),
      bullInner: this.getGameSize(dartboardRealSizesMm.diameter.innerBull / 2),
    }
  };

  private labelsConfig = {
    xAdjustment: { 1: 0, 2: 0 },
    yAdjustment: 0,
  };

  private readonly degreesPerSector = 360 / this.data.sectors.length;
  private readonly radiansPerSector = this.degreesPerSector * Math.PI / 180;
  private readonly degreesStart = -90 + this.degreesPerSector / 2;
  private readonly radiansHalfSector = this.degreesPerSector / 2 * Math.PI / 180;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.updateRenderResolution(width, height);
  }

  public render(): void {
    this.renderCircle(DartboardPalette.Black, this.data.radiuses.outer);

    this.data.sectors.forEach((sector, index) => {
      this.renderSector(sector, index);
    });

    this.renderCircle(DartboardPalette.Green, this.data.radiuses.bullOuter);
    this.renderCircle(DartboardPalette.Red, this.data.radiuses.bullInner);
  }

  public updateRenderResolution(width: number, height: number): void {
    if (width !== height) throw new Error('cannot create DartboardRenderer: width !== height');
    this.renderLength = width;
    this.renderSizeConverter.setRenderLength(this.renderLength);
    this.updateLabelsConfig(this.renderLength);
  }

  private getGameSize(realSize: number): number {
    return realSize * gameOuterRadius / (dartboardRealSizesMm.diameter.outer / 2);
  }

  private renderCircle(color: DartboardPalette, radius: number, origin: Point = this.data.dartboardCenter): void {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.ellipse(
      this.renderSizeConverter.size(origin.x),
      this.renderSizeConverter.size(origin.y),
      this.renderSizeConverter.size(radius),
      this.renderSizeConverter.size(radius),
      0, 0, Math.PI * 2
    );
    this.context.fill();
  }

  private renderSector(sector: number, index: number): void {
    const rotationRadians = (this.degreesStart + this.degreesPerSector * index) * Math.PI / 180;

    const ringsColor = index % 2 === 0 ? DartboardPalette.Green : DartboardPalette.Red;
    const singleColor = index % 2 === 0 ? DartboardPalette.White : DartboardPalette.Black;

    this.renderSectorPart(ringsColor, rotationRadians, this.data.radiuses.doubleRingOuter, this.data.radiuses.doubleRingInner);
    this.renderSectorPart(singleColor, rotationRadians, this.data.radiuses.doubleRingInner, this.data.radiuses.trippleRingOuter);
    this.renderSectorPart(ringsColor, rotationRadians, this.data.radiuses.trippleRingOuter, this.data.radiuses.trippleRingInner);
    this.renderSectorPart(singleColor, rotationRadians, this.data.radiuses.trippleRingInner, this.data.radiuses.bullOuter);

    this.renderSectorLabel(sector, rotationRadians);
  }

  private renderSectorLabel(sector: number, radians: number): void {
    const numberPoint = CoordinateSystemConverter.toCartesian(
      {
        radians: radians + this.radiansHalfSector,
        radius: this.data.radiuses.labels,
      },
      this.data.dartboardCenter
    );

    this.context.fillStyle = DartboardPalette.White;
    this.context.fillText(
      String(sector),
      this.renderSizeConverter.size(numberPoint.x) - this.labelsConfig.xAdjustment[getSingleOrDoubleDigit(sector)],
      this.renderSizeConverter.size(numberPoint.y) + this.labelsConfig.yAdjustment,
    );
  }

  private renderSectorPart(
    color: DartboardPalette,
    rotationRadians: number,
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
      rotationRadians,
      0,
      this.radiansPerSector,
    );
    this.context.ellipse(
      this.renderSizeConverter.size(this.data.dartboardCenter.x),
      this.renderSizeConverter.size(this.data.dartboardCenter.y),
      this.renderSizeConverter.size(innerRadius),
      this.renderSizeConverter.size(innerRadius),
      rotationRadians,
      this.radiansPerSector,
      0,
      true
    );
    this.context.fill();
  }

  private updateLabelsConfig(renderLength: number): void {
    const fontSize = (renderLength / 15) * (gameOuterRadius / 0.5);
    this.context.font = `${Math.round(fontSize)}px sans-serif`;
    this.labelsConfig = {
      xAdjustment: {
        1: Math.round(fontSize / 3),
        2: Math.round(fontSize / 2),
      },
      yAdjustment: Math.round(fontSize / 3),
    };
  }
}

import { sectionsClockwise } from '@constants/sections-clockwise';
import { GameToRenderSizeConverter } from './game-to-render-size-converter.class';
import { dartboardRealSizesMm } from '../constants/dartboard-real-sizes';
import { DartboardPalette } from '../models/dartboard-palette.enum';
import { CoordinateSystemConverter } from './coordinate-system-converter.class';
import { Point } from '../models/point.interface';
import { getSingleOrDoubleDigit } from '../utils/get-single-or-double-digit';
import { defaultCamera } from '../constants/default-camera';
import { SectionTypes } from '@models/section-types.enum';

const gameOuterRadius = 0.49;

type SectorSelected = { sector: number, type: SectionTypes };

export class DartboardRenderer {
  private readonly renderSizeConverter: GameToRenderSizeConverter = new GameToRenderSizeConverter();
  private readonly bgColor: string = 'white';
  private readonly context: CanvasRenderingContext2D;
  private renderLength!: number;
  private camera = defaultCamera;
  private sectorSelected: SectorSelected | null = null;

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

  public focusSector(sector: number, type: SectionTypes): void {
    this.sectorSelected = sector === 0 ? null : { sector, type };
    const index = this.data.sectors.indexOf(sector);
    this.camera = sector === 25
      ? { position: this.data.dartboardCenter, zoom: 4 }
      : index === -1
      ? defaultCamera
      : {
          position: CoordinateSystemConverter.toCartesian({
            radians: this.getSectorRadians(index) + this.radiansHalfSector,
            radius: this.data.radiuses.outer * (type === SectionTypes.Double ? 0.75 : 0.6)
          }, this.data.dartboardCenter),
          zoom: type === SectionTypes.Double ? 3.5 : 2.5
        };
    this.updateLabelsConfig(this.renderLength);
    this.render();
  }

  public render(): void {
    this.clear();
    this.renderCircle('fill', DartboardPalette.Black, this.data.radiuses.outer);

    this.data.sectors.forEach((sector, index) => {
      this.renderSector(sector, index);
    });

    this.renderCircle('fill', DartboardPalette.Green, this.data.radiuses.bullOuter);
    this.renderCircle('fill', DartboardPalette.Red, this.data.radiuses.bullInner);

    if (this.sectorSelected) {
      this.renderSectorHighlight(this.sectorSelected);
    }
  }

  public updateRenderResolution(width: number, height: number): void {
    if (width !== height) throw new Error('cannot create DartboardRenderer: width !== height');
    this.renderLength = width;
    this.renderSizeConverter.setRenderLength(this.renderLength);
    this.context.lineWidth = this.renderLength / 70;
    this.updateLabelsConfig(this.renderLength);
    this.render();
  }

  private clear(): void {
    this.context.fillStyle = this.bgColor;
    this.context.beginPath();
    this.context.rect(0, 0, this.renderLength, this.renderLength);
    this.context.fill();
  }

  private getGameSize(realSize: number): number {
    return realSize * gameOuterRadius / (dartboardRealSizesMm.diameter.outer / 2);
  }

  private getSectorRadians(index: number): number {
    return (this.degreesStart + this.degreesPerSector * index) * Math.PI / 180;
  }

  private renderCircle(
    mode: 'fill' | 'stroke',
    color: DartboardPalette,
    radius: number,
    origin: Point = this.data.dartboardCenter
  ): void {
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.ellipse(
      this.renderSizeConverter.size(origin.x - (this.camera.position.x - 0.5) * this.camera.zoom),
      this.renderSizeConverter.size(origin.y - (this.camera.position.y - 0.5) * this.camera.zoom),
      this.renderSizeConverter.size(radius * this.camera.zoom),
      this.renderSizeConverter.size(radius * this.camera.zoom),
      0, 0, Math.PI * 2
    );
    if (mode === 'fill') {
      this.context.fill();
    } else {
      this.context.closePath();
      this.context.stroke();
    }
  }

  private renderSectorHighlight(sectorSelected: SectorSelected): void {
    const index = this.data.sectors.indexOf(sectorSelected.sector);
    const radians = this.getSectorRadians(index);

    if (sectorSelected.sector === 25) {
      this.renderCircle('stroke', DartboardPalette.Highlight,
        sectorSelected.type === SectionTypes.Any ? this.data.radiuses.bullOuter : this.data.radiuses.bullInner);
    } else if (sectorSelected.type === SectionTypes.Any) {
      this.renderSectorPart('stroke', DartboardPalette.Highlight, radians,
        this.data.radiuses.doubleRingOuter, this.data.radiuses.bullOuter);
    } else if (sectorSelected.type === SectionTypes.Double) {
      this.renderSectorPart('stroke', DartboardPalette.Highlight, radians,
        this.data.radiuses.doubleRingOuter, this.data.radiuses.doubleRingInner);
    } else if (sectorSelected.type === SectionTypes.Triple) {
      this.renderSectorPart('stroke', DartboardPalette.Highlight, radians,
        this.data.radiuses.trippleRingOuter, this.data.radiuses.trippleRingInner);
    }
  }

  private renderSector(sector: number, index: number): void {
    const rotationRadians = this.getSectorRadians(index);

    const ringsColor = index % 2 === 0 ? DartboardPalette.Green : DartboardPalette.Red;
    const singleColor = index % 2 === 0 ? DartboardPalette.White : DartboardPalette.Black;

    this.renderSectorPart('fill', ringsColor, rotationRadians, this.data.radiuses.doubleRingOuter, this.data.radiuses.doubleRingInner);
    this.renderSectorPart('fill', singleColor, rotationRadians, this.data.radiuses.doubleRingInner, this.data.radiuses.trippleRingOuter);
    this.renderSectorPart('fill', ringsColor, rotationRadians, this.data.radiuses.trippleRingOuter, this.data.radiuses.trippleRingInner);
    this.renderSectorPart('fill', singleColor, rotationRadians, this.data.radiuses.trippleRingInner, this.data.radiuses.bullOuter);

    this.renderSectorLabel(sector, rotationRadians);
  }

  private renderSectorLabel(sector: number, radians: number): void {
    const numberPoint = CoordinateSystemConverter.toCartesian(
      {
        radians: radians + this.radiansHalfSector,
        radius: this.data.radiuses.labels * this.camera.zoom,
      },
      this.data.dartboardCenter
    );

    this.context.fillStyle = DartboardPalette.White;
    this.context.fillText(
      String(sector),
      this.renderSizeConverter.size(
        numberPoint.x - (this.camera.position.x - 0.5) * this.camera.zoom
      ) - this.labelsConfig.xAdjustment[getSingleOrDoubleDigit(sector)],
      this.renderSizeConverter.size(
        numberPoint.y - (this.camera.position.y - 0.5) * this.camera.zoom
      ) + this.labelsConfig.yAdjustment,
    );
  }

  private renderSectorPart(
    mode: 'fill' | 'stroke',
    color: DartboardPalette,
    rotationRadians: number,
    outerRadius: number,
    innerRadius: number,
  ): void {
    const xCoord = this.renderSizeConverter.size(this.data.dartboardCenter.x - (this.camera.position.x - 0.5) * this.camera.zoom);
    const yCoord = this.renderSizeConverter.size(this.data.dartboardCenter.y - (this.camera.position.y - 0.5) * this.camera.zoom);
    const innerRenderRadius = this.renderSizeConverter.size(innerRadius * this.camera.zoom);
    const outerRenderRadius = this.renderSizeConverter.size(outerRadius * this.camera.zoom);

    this.context.fillStyle = color;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.ellipse(
      xCoord, yCoord,
      outerRenderRadius,
      outerRenderRadius,
      rotationRadians,
      0,
      this.radiansPerSector,
    );
    this.context.ellipse(
      xCoord, yCoord,
      innerRenderRadius,
      innerRenderRadius,
      rotationRadians,
      this.radiansPerSector,
      0,
      true
    );
    if (mode === 'fill') {
      this.context.fill();
    } else {
      this.context.closePath();
      this.context.stroke();
    }
  }

  private updateLabelsConfig(renderLength: number): void {
    const fontSize = (renderLength / 15) * (gameOuterRadius / 0.5) * this.camera.zoom;
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

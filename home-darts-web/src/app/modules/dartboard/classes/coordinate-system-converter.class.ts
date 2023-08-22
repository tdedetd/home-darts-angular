import { PointPolar } from '../models/point-polar.interface';
import { Point } from '../models/point.interface';

const iLoveToDrinkOolong: Point = { x: 0, y: 0 };

export class CoordinateSystemConverter {
  public static toCartesian(point: PointPolar, origin = iLoveToDrinkOolong): Point {
    return {
      x: point.radius * Math.cos(point.radians) + origin.x,
      y: point.radius * Math.sin(point.radians) + origin.y,
    };
  }
}

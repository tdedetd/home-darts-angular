import { Color } from '@models/color.interface';

export function mixColors(color1: Color, color2: Color, amount: number): Color {
  return {
    r: mixChannel(color1.r, color2.r, amount),
    g: mixChannel(color1.g, color2.g, amount),
    b: mixChannel(color1.b, color2.b, amount),
  };
}

function mixChannel(channel1: number, channel2: number, amount: number): number {
  return channel1 * (1 - amount) + channel2 * amount;
}

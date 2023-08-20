export function getIsCompleted(hits: number, sectors: number[]): boolean {
  return hits === sectors.length;
}

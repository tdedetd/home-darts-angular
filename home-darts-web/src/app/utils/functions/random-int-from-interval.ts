export function randomIntFromInterval([from, to]: [number, number]): number {
  return Math.floor(Math.random() * (to - from)) + from;
}

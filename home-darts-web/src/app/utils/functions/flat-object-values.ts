export function flatObjectValues<T>(obj: Record<string | number | symbol, T[]>): T[] {
  return Object.values(obj).reduce<T[]>((acc, item) => [...acc, ...item], []);
}

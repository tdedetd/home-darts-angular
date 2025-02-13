export function flatObjectValues<T>(obj: Record<PropertyKey, T[]>): T[] {
  return Object.values(obj).reduce<T[]>((acc, item) => [...acc, ...item], []);
}

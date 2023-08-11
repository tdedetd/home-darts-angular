export const isNotEmpty = <T>(value: T | null | undefined): value is T =>
  value !== null && typeof value !== 'undefined';

export const isEmpty = <T>(value: T | null | undefined): value is null | undefined =>
  value === null || typeof value === 'undefined';

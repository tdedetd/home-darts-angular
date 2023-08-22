export function getSingleOrDoubleDigit(n: number): 1 | 2 {
  if (n >= 100 || n < 0) {
    throw new Error(`number ${n} is greater than 10 or negative`);
  }

  return n < 10 ? 1 : 2;
}

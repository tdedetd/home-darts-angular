export class AroundTheClockError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AroundTheClockError';
  }
}

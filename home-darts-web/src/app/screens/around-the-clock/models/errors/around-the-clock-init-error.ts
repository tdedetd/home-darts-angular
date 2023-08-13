import { AroundTheClockError } from './around-the-clock-error';

export class AroundTheClockInitError extends AroundTheClockError {
  constructor(message?: string) {
    super(message);
    this.name = 'AroundTheClockInitError';
  }
}

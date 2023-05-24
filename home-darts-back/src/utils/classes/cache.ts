export class Cache {
  private cache = {};

  public get(key: string): string | undefined {
    return this.cache[key];
  }

  public set(key: string, value: string): void {
    this.cache[key] = value;
  }
}

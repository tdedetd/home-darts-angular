export class Cache<
  KeyType extends string | number | symbol = string,
  ValueType = string
> {
  private readonly cache: Partial<Record<KeyType, ValueType>> = {};

  public get(key: KeyType): ValueType | undefined {
    return this.cache[key];
  }

  public set(key: KeyType, value: ValueType): void {
    this.cache[key] = value;
  }
}

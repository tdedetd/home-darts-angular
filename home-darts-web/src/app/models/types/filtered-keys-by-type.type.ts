export type FilteredKeysByType<T extends object, TypeForFilter> = {
  [K in keyof T]: T[K] extends TypeForFilter ? K : never
}[keyof T];

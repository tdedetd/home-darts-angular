import { SectionTypes } from '../../types/section-types.enum.js';

export function isSectionType(value: string): value is SectionTypes {
  return Object.values<string>(SectionTypes).includes(value);
}

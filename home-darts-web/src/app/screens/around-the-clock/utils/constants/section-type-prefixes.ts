import { SectionTypes } from '@models/enums/section-types.enum';

export const sectionTypePrefixes: Record<SectionTypes, string> = {
  [SectionTypes.Any]: '',
  [SectionTypes.Double]: 'D',
  [SectionTypes.Triple]: 'T',
};

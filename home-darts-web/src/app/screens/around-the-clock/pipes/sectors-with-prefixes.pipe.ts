import { Pipe, PipeTransform } from '@angular/core';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { SectionTypes } from '@models/enums/section-types.enum';
import { sectionTypePrefixes } from '../utils/constants/section-type-prefixes';

@Pipe({
  name: 'sectorsWithPrefixes'
})
export class SectorsWithPrefixesPipe implements PipeTransform {
  public transform(sectors: DartboardSector[], sectionType: SectionTypes): string[] {
    const prefix = sectionTypePrefixes[sectionType];
    return sectors.map(sector => `${prefix}${sector}`);
  }
}

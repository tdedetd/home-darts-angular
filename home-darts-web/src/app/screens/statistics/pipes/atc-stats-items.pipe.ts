import { Pipe, PipeTransform } from '@angular/core';
import { sectionTypesItems } from '@constants/section-type-items';
import { SectionTypes } from '@models/enums/section-types.enum';
import { AggregateOperation } from '@models/aggregate-operation.type';

const aggregateFnMap: Record<AggregateOperation, (a: number, b: number) => number> = {
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b),
  sum: (a, b) => a + b,
}

// TODO: typing
@Pipe({
  name: 'atcStatsItems'
})
export class AtcStatsItemsPipe implements PipeTransform {
  public transform<T extends { sectionType: SectionTypes }>(
    items: T[],
    aggregateOperation: AggregateOperation = 'sum'
  ): (Partial<T> & { sectionType: SectionTypes | 'all' })[] {
    const numberFields = items[0] ? Object.entries(items[0])
      .filter(([, v]) => typeof v === 'number')
      .map(([f]) => f) : [];

    const defaultItem = Object.fromEntries(numberFields.map(f => [f, 0]));

    const resultItemsWithoutAggregate = sectionTypesItems.map(({ value }) =>
      items.find(({ sectionType }) => value === sectionType) ?? {
        ...defaultItem,
        sectionType: value,
      });

    return [
      // actual type: ({ sectionType: 'all' } & Record<string, number>)[]
      resultItemsWithoutAggregate.reduce(
        // TODO: any
        (acc: any, current: any) => ({
          ...acc,
          ...Object.fromEntries(numberFields.map(f => [f, aggregateFnMap[aggregateOperation](acc[f], current[f])]))
        }),
        {
          ...defaultItem,
          sectionType: 'all',
        }
      ),
      ...resultItemsWithoutAggregate,
    ];
  }
}

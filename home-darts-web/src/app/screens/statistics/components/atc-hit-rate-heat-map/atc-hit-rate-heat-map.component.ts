import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { HitRate } from '../../models/hit-rate.interface';
import { DartboardStyle } from '@features/dartboard/models/dartboard-style.interface';
import { DartboardSector } from '@models/types/dartboard-sector.type';
import { mixColors } from '@functions/mix-colors';
import { accentBlueColor } from '@constants/colors/accent-blue-color';
import { lightBlueColor } from '@constants/colors/light-blue-color';
import { materialStyle } from '@features/dartboard/constants/styles/material-style';

@Component({
  selector: 'hd-atc-hit-rate-heat-map',
  templateUrl: './atc-hit-rate-heat-map.component.html',
  styleUrl: './atc-hit-rate-heat-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcHitRateHeatMapComponent {
  public data = input.required<HitRate[]>();

  public dartboardStyles: Signal<DartboardStyle> = computed(() => {
    const hitRateRecords = this.data();
    return this.getDartboardStyles(hitRateRecords);
  });

  private getDartboardStyles(hitRateRecords: HitRate[]): DartboardStyle {
    const hitRates = hitRateRecords
      .filter(({ sector }) => sector !== 25)
      .map(({ hits, throws }) => hits / throws);

    const maxHitRate = Math.max(...hitRates);
    const minHitRate = Math.min(...hitRates);

    const sectorColors: { sector: DartboardSector, color: string }[] = hitRateRecords.map((record) => {
      const hitRate = record.hits / record.throws;
      const amount = (hitRate - minHitRate) / (maxHitRate - minHitRate);
      const color = mixColors(accentBlueColor, lightBlueColor, amount);
      return {
        color: `rgb(${color.r}, ${color.g}, ${color.b})`,
        sector: record.sector,
      };
    });
    return {
      ...materialStyle,
      sectorColors
    };
  }
}

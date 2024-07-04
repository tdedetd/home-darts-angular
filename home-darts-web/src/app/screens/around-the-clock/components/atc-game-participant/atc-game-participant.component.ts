import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TurnHits } from '../../models/turn-hits.type';
import { throwsPerTurn } from '@constants/throws-per-turn';

const turnIndexes = Array(throwsPerTurn).fill(0).map((_, i) => i);

@Component({
  selector: 'hd-atc-game-participant',
  templateUrl: './atc-game-participant.component.html',
  styleUrls: ['./atc-game-participant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameParticipantComponent {
  public active = input.required<boolean>();
  public hits = input.required<number>();
  public username = input.required<string>();
  public throws = input.required<number>();
  public turnHits = input.required<TurnHits>();

  public readonly turnIndexes = turnIndexes;
}

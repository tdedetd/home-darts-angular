import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TurnThrows } from '../../models/turn-throws.type';
import { throwsPerTurn } from '@constants/throws-per-turn';

const turnIndexes = Array(throwsPerTurn).fill(0).map((_, i) => i);

@Component({
  selector: 'hd-atc-game-participant',
  templateUrl: './atc-game-participant.component.html',
  styleUrls: ['./atc-game-participant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameParticipantComponent {
  @Input() public active: boolean | null = false;
  @Input() public hits = 0;
  @Input() public username = '';
  @Input() public throws = 1;
  @Input() public turnHits: TurnThrows = [];

  public readonly turnIndexes = turnIndexes;
}

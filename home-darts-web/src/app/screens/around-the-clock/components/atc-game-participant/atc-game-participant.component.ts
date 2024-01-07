import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input() public active: boolean | null = false;
  @Input() public hits = 0;
  @Input() public username = '';
  @Input() public throws = 1;
  @Input() public turnHits: TurnHits = [];

  public readonly turnIndexes = turnIndexes;
}

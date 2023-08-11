import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { throwsPerTurn } from '@constants/throws-per-turn';

const turnIndexes = Array(throwsPerTurn).fill(0).map((_, i) => i);

@Component({
  selector: 'hd-atc-game-participant',
  templateUrl: './atc-game-participant.component.html',
  styleUrls: ['./atc-game-participant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameParticipantComponent {
  @Input() active: boolean | null = false;
  @Input() hits = 0;
  @Input() username = '';
  @Input() throws = 1;
  @Input() turnHits: [boolean, boolean, boolean] | [boolean, boolean] | [boolean] | [] = [];

  public readonly turnIndexes = turnIndexes;
}

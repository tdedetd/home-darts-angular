import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hd-atc-game-participant',
  templateUrl: './atc-game-participant.component.html',
  styleUrls: ['./atc-game-participant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameParticipantComponent {
  @Input() active = false;
  @Input() hits = 0;
  @Input() username = '';
  @Input() throws = 1;
  @Input() turnHits: [boolean, boolean, boolean] | [boolean, boolean] | [boolean] | [] = [];

  public readonly turnIndexes = [0, 1, 2];
}

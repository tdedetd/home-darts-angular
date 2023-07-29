import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AroundTheClockState } from '../../models/around-the-clock-state.inteface';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { startGameInfoLoading } from '../../../../store/actions/game-info.actions';

@Component({
  selector: 'hd-atc-game',
  templateUrl: './atc-game.component.html',
  styleUrls: ['./atc-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtcGameComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ aroundTheClock: AroundTheClockState }>,
  ) {}

  public ngOnInit(): void {
    const gameId = Number(this.activatedRoute.snapshot.paramMap.get('gameId'));
    this.store.dispatch(startGameInfoLoading({ gameId }))
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hd-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorScreenComponent {
  @Input() public message?: string;
}

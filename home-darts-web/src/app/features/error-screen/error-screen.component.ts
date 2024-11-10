import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hd-error-screen',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorScreenComponent {
  public message = input.required<string>();
}

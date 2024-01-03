import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hd-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyrightComponent {}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IncorrectDisplayWarningService {
  private readonly key = 'incorrectDisplayWarning';

  public loadState(): Observable<boolean> {
    const displayed = localStorage.getItem(this.key);
    return of(displayed?.trim().toLocaleLowerCase() === 'true');
  }

  public markAsDisplayed(): void {
    localStorage.setItem(this.key, 'true');
  }
}

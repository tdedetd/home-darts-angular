import { FormControl } from '@angular/forms';

export type FormControlsOf<T extends object> = { [K in keyof T]: FormControl<T[K]> };

import { Injectable } from '@angular/core';
import { SettingsState } from '@models/settings-state.interface';
import { defaultSettings } from '@constants/default-settings';
import { md5 } from 'js-md5';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly version = 1;

  private get key(): string {
    return SettingsService.getSettingsKey(this.version);
  }

  constructor() {
    SettingsService.clearOldVersions(this.version);
  }

  private static clearOldVersions(version: number): void {
    for (let i = 1; i < version; i++) {
      localStorage.removeItem(SettingsService.getSettingsKey(i));
    }
  }

  private static getSettingsKey(version: number): string {
    return `settings_${md5.hex(String(version))}`;
  }

  public load(): SettingsState {
    const settingsStr = localStorage.getItem(this.key);

    if (settingsStr === null) {
      return defaultSettings;
    }

    const settingsParsed: Partial<SettingsState> = JSON.parse(settingsStr);

    return {
      dartboardStyle: settingsParsed.dartboardStyle ?? defaultSettings.dartboardStyle,
      sounds: settingsParsed.sounds ?? defaultSettings.sounds,
      vibration: settingsParsed.vibration ?? defaultSettings.vibration,
    };
  }

  public save(settings: SettingsState): void {
    localStorage.setItem(this.key, JSON.stringify(settings))
  }
}

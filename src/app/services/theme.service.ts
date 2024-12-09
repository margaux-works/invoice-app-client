import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'darkMode';

  constructor() {}

  isDarkMode(): boolean {
    return localStorage.getItem(this.themeKey) === 'true';
  }

  toggleTheme(): void {
    const isDark = !this.isDarkMode();
    localStorage.setItem(this.themeKey, String(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }
}

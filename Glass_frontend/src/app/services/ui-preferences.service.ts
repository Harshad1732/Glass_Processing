import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiPreferencesService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly sidebarStateKey = 'dashboard.sidebar.collapsed';
  private readonly themeStateKey = 'dashboard.theme.dark';
  private readonly branchStateKey = 'dashboard.branch.name';

  readonly isSidebarCollapsed = signal(false);
  readonly isDarkTheme = signal(true);
  readonly branchName = signal<'Thane' | 'Taloja'>('Thane');

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const storedSidebar = localStorage.getItem(this.sidebarStateKey);
    this.isSidebarCollapsed.set(storedSidebar === 'true');

    const storedTheme = localStorage.getItem(this.themeStateKey);
    if (storedTheme !== null) {
      this.isDarkTheme.set(storedTheme === 'true');
    }

    const storedBranch = localStorage.getItem(this.branchStateKey);
    if (storedBranch === 'Thane' || storedBranch === 'Taloja') {
      this.branchName.set(storedBranch);
    }

    this.applyThemeClass();
  }

  toggleSidebar() {
    const next = !this.isSidebarCollapsed();
    this.isSidebarCollapsed.set(next);
    if (this.isBrowser) {
      localStorage.setItem(this.sidebarStateKey, String(next));
    }
  }

  toggleTheme() {
    const next = !this.isDarkTheme();
    this.isDarkTheme.set(next);
    if (this.isBrowser) {
      localStorage.setItem(this.themeStateKey, String(next));
      this.applyThemeClass();
    }
  }

  toggleBranch() {
    const next = this.branchName() === 'Thane' ? 'Taloja' : 'Thane';
    this.branchName.set(next);
    if (this.isBrowser) {
      localStorage.setItem(this.branchStateKey, next);
    }
  }

  private applyThemeClass() {
    const body = this.document.body;
    body.classList.toggle('theme-dark', this.isDarkTheme());
    body.classList.toggle('theme-light', !this.isDarkTheme());
  }
}

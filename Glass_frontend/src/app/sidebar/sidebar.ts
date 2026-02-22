import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

interface MenuItem {
  label: string;
  iconName: string;
  submenu?: MenuItem[];
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly expandedMenuKey = 'dashboard.sidebar.expandedMenu';
  @Input() collapsed = false;
  @Input() lightTheme = false;

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      iconName: 'house',
      route: '/dashboard',
    },
    {
      label: 'Upload File',
      iconName: 'upload',
      route: '/upload-file',
    },
    {
      label: 'Reports',
      iconName: 'chart-column',
      submenu: [
        { label: 'Top 5', iconName: 'trending-up', route: '/reports/top-five' },
        { label: 'Visibility New Print', iconName: 'eye' },
        { label: 'Print', iconName: 'printer' },
        { label: 'Floor', iconName: 'building-2' },
        { label: 'Visibility New Lamination', iconName: 'eye-off' },
        { label: 'WTR', iconName: 'trending-up', route: '/reports/wtr' },
        { label: 'Batch List', iconName: 'list', route: '/reports/batch-list' },
        { label: 'Quantity Tracking', iconName: 'package', route: '/reports/quantity-tracking' },
        { label: 'Dispatch Report', iconName: 'truck', route: '/reports/dispatch-report' },
        { label: 'Sales Report', iconName: 'dollar-sign', route: '/reports/sales-report' },
        { label: 'Replacement Card', iconName: 'rotate-ccw', route: '/reports/replacement-card' },
      ],
    },
    {
      label: 'Settings',
      iconName: 'settings',
      route: '/settings',
    },
    {
      label: 'User Access',
      iconName: 'users',
    },
  ];

  expandedMenu: string | null = null;

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const storedExpandedMenu = localStorage.getItem(this.expandedMenuKey);
    this.expandedMenu = storedExpandedMenu || null;
  }

  toggleMenu(label: string) {
    if (this.collapsed) {
      return;
    }

    this.expandedMenu = this.expandedMenu === label ? null : label;
    if (this.isBrowser) {
      if (this.expandedMenu) {
        localStorage.setItem(this.expandedMenuKey, this.expandedMenu);
      } else {
        localStorage.removeItem(this.expandedMenuKey);
      }
    }
  }

  onMenuClick(item: MenuItem) {
    if (item.submenu) {
      this.toggleMenu(item.label);
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  onSubmenuClick(subitem: MenuItem, event: Event) {
    event.preventDefault();
    if (subitem.route) {
      this.router.navigate([subitem.route]);
    }
  }
}

import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

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
  @Input() collapsed = false;
  @Input() lightTheme = false;

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      iconName: 'house',
      route: '/dashboard',
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
        { label: 'Quantity Tracking', iconName: 'package' },
        { label: 'Dispatch Report', iconName: 'truck' },
        { label: 'Sales Report', iconName: 'dollar-sign', route: '/reports/sales-report' },
        { label: 'Replacement Card', iconName: 'rotate-ccw' },
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

  toggleMenu(label: string) {
    if (this.collapsed) {
      return;
    }

    this.expandedMenu = this.expandedMenu === label ? null : label;
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

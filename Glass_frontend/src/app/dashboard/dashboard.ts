import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { LucideAngularModule } from 'lucide-angular';
import { UiPreferencesService } from '../services/ui-preferences.service';

interface WorkItem {
  label: string;
  iconName?: string;
  color: string;
}

interface WorkSection {
  title: string;
  items: WorkItem[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly router = inject(Router);
  readonly ui = inject(UiPreferencesService);

  get isSidebarCollapsed() {
    return this.ui.isSidebarCollapsed();
  }

  get isDarkTheme() {
    return this.ui.isDarkTheme();
  }

  get branchName() {
    return this.ui.branchName();
  }

  sections: WorkSection[] = [
    {
      title: 'Order Process',
      items: [
        { label: 'Create Order', iconName: 'file-text', color: '#b8860b' },
        { label: 'Process Order', iconName: 'wrench', color: '#4a90e2' },
        { label: 'RTD', iconName: 'chart-column', color: '#50c878' },
        { label: 'Delivered', iconName: 'circle-check-big', color: '#c946a6' },
        { label: 'Store', iconName: 'store', color: '#20b2aa' },
      ],
    },
    {
      title: 'Work Station',
      items: [
        { label: 'WC1 Cutting', iconName: 'scissors', color: '#17a2b8' },
        { label: 'WC2 Edger', iconName: 'wrench', color: '#ff5252' },
        { label: 'WC3 Marking', iconName: 'palette', color: '#b720f0' },
        { label: 'WC4 Black Border', iconName: 'square', color: '#2196f3' },
        { label: 'WC5 Toughening', iconName: 'flame', color: '#7cb342' },
        { label: 'WC6 Lamination', iconName: 'layers', color: '#00897b' },
        { label: 'WC7 Autoclave', iconName: 'zap', color: '#9c27b0' },
        { label: 'WC8', iconName: 'grid-3x3', color: '#e91e63' },
        { label: 'WC9 Dispatch', iconName: 'truck', color: '#d946ef' },
      ],
    },
    {
      title: 'Other',
      items: [
        { label: 'On\nHold', iconName: 'circle-pause', color: '#6f42c1' },
        { label: 'Replacement', iconName: 'rotate-ccw', color: '#e13a8b' },
        { label: 'WC5-\nBatch\nToughning', iconName: 'boxes', color: '#7ed321' },
        { label: 'WC7\nBatch\nAutoClave', iconName: 'shield-check', color: '#7ed321' },
      ],
    },
  ];

  toggleSidebar() {
    this.ui.toggleSidebar();
  }

  toggleTheme() {
    this.ui.toggleTheme();
  }

  toggleBranch() {
    this.ui.toggleBranch();
  }

  onWorkItemClick(item: WorkItem) {
    const normalizedLabel = item.label.replace(/\s+/g, ' ').trim();

    if (item.label === 'Create Order') {
      this.router.navigate(['/create-order']);
      return;
    }

    if (item.label === 'Process Order') {
      this.router.navigate(['/process-order']);
      return;
    }

    if (item.label === 'RTD') {
      this.router.navigate(['/rtd-list']);
      return;
    }

    if (item.label === 'Delivered') {
      this.router.navigate(['/delivered-report']);
      return;
    }

    if (normalizedLabel === 'On Hold') {
      this.router.navigate(['/hold-list']);
      return;
    }

    if (normalizedLabel === 'Replacement') {
      this.router.navigate(['/replace-release']);
      return;
    }

    if (normalizedLabel === 'WC5- Batch Toughning') {
      this.router.navigate(['/work-center', 'WC5BATCH']);
      return;
    }

    if (normalizedLabel === 'WC7 Batch AutoClave') {
      this.router.navigate(['/work-center', 'WC7BATCH']);
      return;
    }

    const wcMatch = item.label.match(/^WC\d+/i);
    if (!wcMatch) {
      return;
    }

    this.router.navigate(['/work-center', wcMatch[0].toUpperCase()]);
  }
}

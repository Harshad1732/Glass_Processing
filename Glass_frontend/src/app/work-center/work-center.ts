import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

interface WorkCenterLine {
  id: string;
  srNo: number;
  party: string;
  soDate: string;
  size: string;
  thickness: number;
  csqm: string;
  rbd: string;
  orderQty: number;
  qty: number;
  processQty: number;
  process: string;
  tn: number;
}

interface WorkCenterGroup {
  id: string;
  crNo: string;
  party: string;
  lines: WorkCenterLine[];
}

@Component({
  selector: 'app-work-center',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './work-center.html',
  styleUrl: './work-center.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkCenter {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly ui = inject(UiPreferencesService);

  readonly wcId = this.route.snapshot.paramMap.get('id') ?? 'WC1';

  readonly groups: WorkCenterGroup[] = [];

  readonly expandedGroups = signal<Record<string, boolean>>({});

  readonly selectedLines = signal<Record<string, boolean>>({});

  readonly selectedCount = computed(
    () => Object.values(this.selectedLines()).filter(Boolean).length,
  );

  get showRevertToWtr() {
    return this.wcId.toUpperCase() === 'WC1';
  }

  get isWc5() {
    return this.wcId.toUpperCase() === 'WC5';
  }

  get pageTitle() {
    const wc = this.wcId.toUpperCase();
    if (wc === 'WC5BATCH') {
      return 'WC5 Batch';
    }
    if (wc === 'WC7BATCH') {
      return 'WC7 Batch';
    }
    return wc;
  }

  get showHoldButton() {
    return true;
  }

  get isSidebarCollapsed() {
    return this.ui.isSidebarCollapsed();
  }

  get isDarkTheme() {
    return this.ui.isDarkTheme();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  toggleSidebar() {
    this.ui.toggleSidebar();
  }

  toggleTheme() {
    this.ui.toggleTheme();
  }

  toggleGroup(groupId: string) {
    this.expandedGroups.update((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  }

  isExpanded(groupId: string) {
    return this.expandedGroups()[groupId];
  }

  toggleLine(lineId: string, checked: boolean) {
    this.selectedLines.update((current) => ({
      ...current,
      [lineId]: checked,
    }));
  }

  groupProcessQty(group: WorkCenterGroup) {
    return group.lines.reduce((sum, line) => sum + line.processQty, 0);
  }
}

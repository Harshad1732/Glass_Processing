import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

interface QuantityRow {
  entryCode: string;
  bPlant: string;
  status: string;
  createdOn: string;
  updatedOn: string;
  qty: number;
}

@Component({
  selector: 'app-quantity-tracking',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './quantity-tracking.html',
  styleUrl: './quantity-tracking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityTracking {
  readonly ui = inject(UiPreferencesService);

  readonly rows: QuantityRow[] = [
    {
      entryCode: 'EN-250201',
      bPlant: 'Thane',
      status: 'Open',
      createdOn: '2026-02-20',
      updatedOn: '2026-02-22',
      qty: 128,
    },
    {
      entryCode: 'EN-250202',
      bPlant: 'Taloja',
      status: 'Closed',
      createdOn: '2026-02-19',
      updatedOn: '2026-02-21',
      qty: 64,
    },
  ];

  get isSidebarCollapsed() {
    return this.ui.isSidebarCollapsed();
  }

  get isDarkTheme() {
    return this.ui.isDarkTheme();
  }

  get branchName() {
    return this.ui.branchName();
  }

  toggleSidebar() {
    this.ui.toggleSidebar();
  }

  toggleTheme() {
    this.ui.toggleTheme();
  }

  openDatePicker(input: HTMLInputElement) {
    input.focus();
    const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof pickerInput.showPicker === 'function') {
      pickerInput.showPicker();
      return;
    }

    input.click();
  }
}

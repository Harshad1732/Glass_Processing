import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

interface TopFiveRow {
  soDate: string;
  plant: string;
  crNo: string;
  partyName: string;
  qty: number;
  sqm: string;
  csqm: string;
  rbd: string;
}

@Component({
  selector: 'app-top-five',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './top-five.html',
  styleUrl: './top-five.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopFive {
  readonly ui = inject(UiPreferencesService);

  readonly wtrRows: TopFiveRow[] = [];
  readonly osfRows: TopFiveRow[] = [
    {
      soDate: '10/1/2026',
      plant: 'Taloja',
      crNo: 'CR2601/9190',
      partyName: 'JOVIAL INTERNATIONAL',
      qty: 27,
      sqm: '77.47',
      csqm: '128.96',
      rbd: '14/1/2026',
    },
  ];
  readonly rtdRows: TopFiveRow[] = [];

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
}


import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

interface WtrRow {
  crNo: string;
  soDate: string;
  thickness: string;
  partyName: string;
  qty: number;
  sqm: string;
  csqm: string;
  process: string;
  logo: string;
  rbd: string;
  bPlant: string;
}

@Component({
  selector: 'app-wtr-report',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './wtr-report.html',
  styleUrl: './wtr-report.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WtrReport {
  readonly ui = inject(UiPreferencesService);

  readonly rows: WtrRow[] = [
    {
      crNo: 'CR2512/8766',
      soDate: '2026-01-06',
      thickness: '11.52',
      partyName: 'RAJARAM STEEL FURNITURE- NASHIK',
      qty: 146,
      sqm: '130.87',
      csqm: '267.55',
      process: 'LAM',
      logo: 'DZ',
      rbd: '2026-01-14',
      bPlant: 'Thane',
    },
    {
      crNo: 'CR2601/9037',
      soDate: '2026-01-03',
      thickness: '11.52',
      partyName: 'Technoformat Infrasolution',
      qty: 2,
      sqm: '3.44',
      csqm: '3.02',
      process: 'LAM',
      logo: 'DZ',
      rbd: '2026-01-10',
      bPlant: 'Thane',
    },
    {
      crNo: 'CR2601/9053',
      soDate: '2026-01-05',
      thickness: '10.76',
      partyName: 'Vijay Engineering Works',
      qty: 3,
      sqm: '5.32',
      csqm: '4.64',
      process: 'LAM',
      logo: 'DZ',
      rbd: '2026-01-13',
      bPlant: 'Thane',
    },
    {
      crNo: 'CR2601/9129',
      soDate: '2026-01-08',
      thickness: '8.76',
      partyName: 'MTM Workplace Solutions Pvt. Ltd.',
      qty: 1,
      sqm: '1.45',
      csqm: '1.02',
      process: 'LAM',
      logo: 'DZ',
      rbd: '2026-01-15',
      bPlant: 'Thane',
    },
    {
      crNo: 'CR2601/9144',
      soDate: '2026-01-08',
      thickness: '11.76',
      partyName: 'SA Enterprises',
      qty: 1,
      sqm: '2.35',
      csqm: '2.05',
      process: 'LAM',
      logo: 'DZ',
      rbd: '2026-01-14',
      bPlant: 'Thane',
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
}

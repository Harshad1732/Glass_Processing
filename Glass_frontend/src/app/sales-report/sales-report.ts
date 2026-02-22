import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

interface SalesReportRow {
  crNo: string;
  soDate: string | null;
  partyName: string | null;
  thickness: string | null;
  totalQty: number | null;
  totalSQM: number | null;
  status: string | null;
  bPlant: string | null;
  process: string | null;
  rbd: string | null;
  rtd: string | null;
  deliveryDate: string | null;
}

interface ApiResponse<T> {
  status: boolean;
  ackMsg: string;
  data: T | null;
}

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './sales-report.html',
  styleUrl: './sales-report.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesReport {
  readonly ui = inject(UiPreferencesService);
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  crNo = '';
  partyName = '';
  rows: SalesReportRow[] = [];
  isLoading = false;
  responseMessage = 'No data';
  private readonly apiBaseUrl = 'http://localhost:5156/api/salesreport';

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

  onCrNoInput(event: Event) {
    this.crNo = (event.target as HTMLInputElement).value;
  }

  onPartyNameInput(event: Event) {
    this.partyName = (event.target as HTMLInputElement).value;
  }

  onSearch() {
    const crNo = this.crNo.trim();
    const partyName = this.partyName.trim();

    if (!crNo && !partyName) {
      this.rows = [];
      this.responseMessage = 'Please enter CR No or Party Name';
      return;
    }

    let params = new HttpParams();
    if (crNo) {
      params = params.set('crNo', crNo);
    }
    if (partyName) {
      params = params.set('partyName', partyName);
    }

    this.isLoading = true;
    this.responseMessage = 'Loading...';

    this.http.get<ApiResponse<SalesReportRow[]>>(this.apiBaseUrl, { params }).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (!response.status) {
          this.rows = [];
          this.responseMessage = response.ackMsg || 'Failed to fetch sales report';
          this.cdr.markForCheck();
          return;
        }

        this.rows = response.data ?? [];
        this.responseMessage = this.rows.length ? '' : 'No data';
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.rows = [];
        this.responseMessage = 'Unable to fetch sales report';
        this.cdr.markForCheck();
      },
    });
  }

  formatDate(dateValue: string | null) {
    if (!dateValue) {
      return '-';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return '-';
    }

    return date.toLocaleDateString('en-GB');
  }
}

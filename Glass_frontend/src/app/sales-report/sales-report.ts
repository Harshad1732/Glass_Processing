import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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

interface PartyOption {
  pid: number;
  partName: string;
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
export class SalesReport implements OnInit {
  readonly ui = inject(UiPreferencesService);
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  crNo = '';
  partyId = '';
  parties: PartyOption[] = [];

  rows: SalesReportRow[] = [];
  isLoading = false;
  responseMessage = 'No data';

private readonly salesApiUrl = 'https://localhost:7058/api/SalesReport';
private readonly customersApiUrl = 'https://localhost:7058/api/customers';

  ngOnInit() {
    this.loadCustomers();
  }

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

  onPartyChange(event: Event) {
    this.partyId = (event.target as HTMLSelectElement).value;
  }

  onSearch() {
    console.log("Search clicked");
    const crNo = this.crNo.trim();
    const partyId = this.partyId ? Number(this.partyId) : null;

    if (!crNo && !partyId) {
      this.rows = [];
      this.responseMessage = 'Please enter CR No or select Party';
      return;
    }

    let params = new HttpParams();

    if (crNo) {
      params = params.set('crNo', crNo);
    }

    if (partyId) {
      params = params.set('partyId', partyId);
    }

    this.isLoading = true;
    this.responseMessage = 'Loading...';

    this.http.get<ApiResponse<SalesReportRow[]>>(this.salesApiUrl, { params }).subscribe({
      next: (response) => {
    console.log("Full API Response:", response);       // ✅ full response
    console.log("Response Data:", response.data);      // ✅ actual rows
    console.log("Status:", response.status);
    console.log("Message:", response.ackMsg);

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

  private loadCustomers() {
    this.http.get<ApiResponse<unknown> | unknown[]>(this.customersApiUrl).subscribe({
      next: (response) => {
        const responseData = Array.isArray(response)
          ? response
          : Array.isArray(response.data)
            ? response.data
            : [];

        this.parties = responseData
          .map((item) => {
            const pidValue = this.readNumeric(item, ['PID', 'pid', 'Pid']);
            const partNameValue = this.readString(item, ['PartName', 'partName', 'partname']);

            if (!pidValue || !partNameValue) {
              return null;
            }

            return {
              pid: pidValue,
              partName: partNameValue,
            } as PartyOption;
          })
          .filter((item): item is PartyOption => item !== null);

        this.cdr.markForCheck();
      },
      error: () => {
        this.parties = [];
        this.cdr.markForCheck();
      },
    });
  }

  private readNumeric(source: unknown, keys: string[]) {
    if (!source || typeof source !== 'object') {
      return null;
    }

    for (const key of keys) {
      const value = (source as Record<string, unknown>)[key];
      const numeric = typeof value === 'number' ? value : Number(value);

      if (Number.isFinite(numeric) && numeric > 0) {
        return numeric;
      }
    }

    return null;
  }

  private readString(source: unknown, keys: string[]) {
    if (!source || typeof source !== 'object') {
      return null;
    }

    for (const key of keys) {
      const value = (source as Record<string, unknown>)[key];

      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }

    return null;
  }
}

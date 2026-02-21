import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';
import { AuthService, User } from '../services/auth.service';

interface SettingsUserRow {
  id: number;
  displayName: string;
  loginId: string;
  passwordMask: string;
  plant: 'Thane' | 'Taloja';
  status: 'Active';
  role: 'Admin' | 'Dispatch' | 'ShiftIncharge' | 'Sales';
  wcAccess: boolean[];
}

interface CustomerRow {
  id: number;
  custCode: string;
  customerName: string;
  streetAddress: string;
  state: string;
  city: string;
  pin: string;
}

interface ProcessDefinition {
  code: string;
  enabledWcs: number[];
}

interface WorkCenterRow {
  id: string;
  name: string;
  explanation: string;
  srNo: number;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly router = inject(Router);
  readonly ui = inject(UiPreferencesService);
  private readonly auth = inject(AuthService);

  readonly activeTab = signal<'User Profile' | 'Customers' | 'WorkCenters' | 'Process Definition'>('User Profile');
  readonly searchValue = signal('');
  readonly customerFilters = signal({
    code: '',
    customerName: '',
    streetAddress: '',
    state: '',
    city: '',
    pin: '',
  });
  readonly workCenterFilters = signal({
    id: '',
    name: '',
    explanation: '',
    srNo: '',
  });

  readonly rows = computed<SettingsUserRow[]>(() =>
    this.auth.getUsers().map((user, index) => this.toRow(user, index)),
  );

  readonly filteredRows = computed(() => {
    const query = this.searchValue().trim().toLowerCase();
    if (!query) {
      return this.rows();
    }
    return this.rows().filter((row) =>
      `${row.displayName} ${row.loginId}`.toLowerCase().includes(query),
    );
  });

  readonly customers = signal<CustomerRow[]>([
    { id: 1, custCode: 'C001', customerName: 'Sudarshan Glass Depot', streetAddress: 'Nashik', state: 'Maharashtra', city: 'Nashik', pin: '400112' },
    { id: 2, custCode: 'C002', customerName: 'Zillo Arctech', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400604' },
    { id: 3, custCode: 'C003', customerName: 'Prisha Interiors', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400604' },
    { id: 4, custCode: 'C004', customerName: 'Gajjar & Associates', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400604' },
    { id: 5, custCode: 'C005', customerName: '3G Glass Gallery', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400602' },
    { id: 6, custCode: 'C006', customerName: 'Laxmi Enterprises', streetAddress: 'Mulund', state: 'Maharashtra', city: 'Mumbai', pin: '400402' },
    { id: 7, custCode: 'C007', customerName: 'Aar Ess Enterprise', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400604' },
    { id: 8, custCode: 'C008', customerName: 'Matrix Architectural Solutions', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400605' },
    { id: 9, custCode: 'C009', customerName: 'Tej Control Systems Pvt Ltd', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400606' },
    { id: 10, custCode: 'C010', customerName: 'Technoformat Infrasolutions', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400601' },
    { id: 11, custCode: 'C011', customerName: 'Bafna Glass', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400601' },
    { id: 12, custCode: 'C012', customerName: 'Kubik India Pvt Ltd', streetAddress: 'Thane', state: 'Maharashtra', city: 'Thane', pin: '400601' },
  ]);

  readonly filteredCustomers = computed(() => {
    const f = this.customerFilters();
    const q = this.searchValue().trim().toLowerCase();
    return this.customers().filter((c) => {
      const matchesTopSearch = !q || `${c.customerName} ${c.custCode}`.toLowerCase().includes(q);
      const byCode = !f.code || c.custCode.toLowerCase().includes(f.code.toLowerCase());
      const byName = !f.customerName || c.customerName.toLowerCase().includes(f.customerName.toLowerCase());
      const byAddress = !f.streetAddress || c.streetAddress.toLowerCase().includes(f.streetAddress.toLowerCase());
      const byState = !f.state || c.state.toLowerCase().includes(f.state.toLowerCase());
      const byCity = !f.city || c.city.toLowerCase().includes(f.city.toLowerCase());
      const byPin = !f.pin || c.pin.includes(f.pin);
      return matchesTopSearch && byCode && byName && byAddress && byState && byCity && byPin;
    });
  });

  readonly processDefinitions = signal<ProcessDefinition[]>([
    { code: 'APT', enabledWcs: [1, 2, 3, 5, 9] },
    { code: 'BB', enabledWcs: [1, 2, 4, 5, 9] },
    { code: 'CCT', enabledWcs: [1, 2, 5, 9] },
    { code: 'DGU', enabledWcs: [1, 2, 5, 9] },
    { code: 'FR', enabledWcs: [1, 2, 3, 5, 9] },
    { code: 'FRS', enabledWcs: [1, 2, 3, 5, 9] },
    { code: 'JW', enabledWcs: [3, 5, 9] },
    { code: 'LAM', enabledWcs: [1, 2, 5, 6, 7, 9] },
    { code: 'MRK', enabledWcs: [1, 2, 3, 5, 9] },
  ]);

  readonly workCenters = signal<WorkCenterRow[]>([
    { id: 'WC1', name: 'Cutting', explanation: 'Cutting and size preparation', srNo: 1 },
    { id: 'WC2', name: 'Edger', explanation: 'Edge polishing', srNo: 2 },
    { id: 'WC3', name: 'Marking', explanation: 'Marking and layout', srNo: 3 },
    { id: 'WC4', name: 'Black Border', explanation: 'Border process', srNo: 4 },
    { id: 'WC5', name: 'Toughening', explanation: 'Toughening line', srNo: 5 },
    { id: 'WC6', name: 'Lamination', explanation: 'Lamination process', srNo: 6 },
    { id: 'WC7', name: 'Autoclave', explanation: 'Autoclave finalization', srNo: 7 },
    { id: 'WC8', name: 'Inspection', explanation: 'Quality check', srNo: 8 },
    { id: 'WC9', name: 'Dispatch', explanation: 'Dispatch and shipment', srNo: 9 },
  ]);

  readonly filteredWorkCenters = computed(() => {
    const f = this.workCenterFilters();
    const q = this.searchValue().trim().toLowerCase();
    return this.workCenters().filter((wc) => {
      const topSearch = !q || `${wc.id} ${wc.name} ${wc.explanation}`.toLowerCase().includes(q);
      const byId = !f.id || wc.id.toLowerCase().includes(f.id.toLowerCase());
      const byName = !f.name || wc.name.toLowerCase().includes(f.name.toLowerCase());
      const byExplanation = !f.explanation || wc.explanation.toLowerCase().includes(f.explanation.toLowerCase());
      const bySr = !f.srNo || String(wc.srNo).includes(f.srNo);
      return topSearch && byId && byName && byExplanation && bySr;
    });
  });

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

  toggleBranch() {
    this.ui.toggleBranch();
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  selectTab(tab: 'User Profile' | 'Customers' | 'WorkCenters' | 'Process Definition') {
    this.activeTab.set(tab);
  }

  setSearch(value: string) {
    this.searchValue.set(value);
  }

  setCustomerFilter(field: 'code' | 'customerName' | 'streetAddress' | 'state' | 'city' | 'pin', value: string) {
    this.customerFilters.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  setWorkCenterFilter(field: 'id' | 'name' | 'explanation' | 'srNo', value: string) {
    this.workCenterFilters.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  wcRows() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  isProcessWcEnabled(process: ProcessDefinition, wc: number) {
    return process.enabledWcs.includes(wc);
  }

  private toRow(user: User, index: number): SettingsUserRow {
    const rolePool: SettingsUserRow['role'][] = ['Admin', 'Dispatch', 'ShiftIncharge', 'Sales'];
    const role = user.email.includes('john') ? 'Admin' : rolePool[index % rolePool.length];
    const plant: SettingsUserRow['plant'] = index % 2 === 0 ? 'Thane' : 'Taloja';
    const wcAccess = this.createWcAccess(role);

    return {
      id: user.id,
      displayName: `${user.firstName} ${user.lastName}`,
      loginId: user.email,
      passwordMask: '1',
      plant,
      status: 'Active',
      role,
      wcAccess,
    };
  }

  private createWcAccess(role: SettingsUserRow['role']) {
    if (role === 'Admin') {
      return Array.from({ length: 9 }, () => true);
    }
    if (role === 'ShiftIncharge') {
      return [true, true, true, true, true, false, false, false, false];
    }
    if (role === 'Dispatch') {
      return Array.from({ length: 9 }, () => false);
    }
    return [false, false, false, false, false, false, false, false, false];
  }
}

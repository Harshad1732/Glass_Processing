import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, Sidebar],
  templateUrl: './create-order.html',
  styleUrl: './create-order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrder {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly ui = inject(UiPreferencesService);

  readonly form = this.fb.group({
    entryCode: [''],
    bpCode: [''],
    plant: [''],
    partyName: [''],
    soDate: [''],
    crNo: [''],
    requiredBy: [''],
    plDate: [''],
    isExpress: [false],
    srNo: [''],
    qty: [''],
    process: [''],
    note: [''],
    thickness: [''],
    sizeW: [''],
    sizeH: [''],
    logo: [''],
    type: [''],
    itemNo: [''],
    partName: [''],
  });

  readonly plantOptions = ['Thane', 'Taloja'];
  readonly processOptions = ['CCT', 'Toughening', 'Lamination'];
  readonly logoOptions = ['Logo A', 'Logo B', 'No Logo'];
  readonly typeOptions = ['Standard', 'Customized'];

  get isSidebarCollapsed() {
    return this.ui.isSidebarCollapsed();
  }

  get isDarkTheme() {
    return this.ui.isDarkTheme();
  }

  toggleSidebar() {
    this.ui.toggleSidebar();
  }

  toggleTheme() {
    this.ui.toggleTheme();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  addItem() {
    // Placeholder action for current UI prototype.
    console.log('Add item', this.form.value);
  }
}

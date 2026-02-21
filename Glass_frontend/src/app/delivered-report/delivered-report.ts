import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

@Component({
  selector: 'app-delivered-report',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './delivered-report.html',
  styleUrl: './delivered-report.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveredReport {
  private readonly router = inject(Router);
  readonly ui = inject(UiPreferencesService);

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
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from '../sidebar/sidebar';
import { UiPreferencesService } from '../services/ui-preferences.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Sidebar],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFile {
  private readonly router = inject(Router);
  readonly ui = inject(UiPreferencesService);

  readonly selectedFileName = signal('No file selected');
  readonly selectedFileMeta = signal('Accepted formats: .xls, .xlsx, .csv');
  readonly uploadMessage = signal('Select an Excel file and click upload.');
  readonly hasFile = computed(() => this.selectedFileName() !== 'No file selected');

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

  goToLamination() {
    this.router.navigate(['/work-center/WC6']);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.selectedFileName.set('No file selected');
      this.selectedFileMeta.set('Accepted formats: .xls, .xlsx, .csv');
      this.uploadMessage.set('Select an Excel file and click upload.');
      return;
    }

    const sizeInKb = Math.max(1, Math.round(file.size / 1024));
    this.selectedFileName.set(file.name);
    this.selectedFileMeta.set(`${sizeInKb} KB`);
    this.uploadMessage.set('File is ready. Click upload to continue.');
  }

  chooseFile(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  uploadFile() {
    // Placeholder action until API integration.
    if (!this.hasFile()) {
      return;
    }

    this.uploadMessage.set(`Upload queued: ${this.selectedFileName()}`);
  }
}

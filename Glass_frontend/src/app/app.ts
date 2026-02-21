import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiPreferencesService } from './services/ui-preferences.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  constructor(ui: UiPreferencesService) {
    // Ensures theme class is initialized as soon as the app boots.
    void ui;
  }
}

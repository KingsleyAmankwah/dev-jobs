import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Dev Jobs';
  public isActive = false;
  private isDarkTheme = false;

  constructor(private appService: AppService, private renderer: Renderer2) {}

  public toggleButton() {
    this.isActive = !this.isActive;
    this.appService.toggleTheme();
  }

  private applyTheme() {
    if (this.isDarkTheme) {
      this.renderer.setStyle(document.body, 'backgroundColor', '#121721');
    } else {
      this.renderer.setStyle(document.body, 'backgroundColor', '#f4f6f8');
    }
  }

  ngOnInit() {
    this.appService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
      this.applyTheme();
    });
  }
}

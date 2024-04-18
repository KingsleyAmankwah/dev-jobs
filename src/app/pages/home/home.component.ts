import { Component, HostListener } from '@angular/core';
import { JobCardComponent } from '../../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JobCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public filterByLocation: boolean = false;
  public isDarkTheme: boolean = false;

  public toggleFilterByLocation() {
    this.filterByLocation = !this.filterByLocation;
  }

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
    });
  }
}

import { Component, HostListener } from '@angular/core';
import { JobCardComponent } from '../../job-card/job-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JobCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public filterByLocation: boolean = false;

  public toggleFilterByLocation() {
    this.filterByLocation = !this.filterByLocation;
  }
}

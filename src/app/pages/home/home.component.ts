import { Component, HostListener } from '@angular/core';
import { JobCardComponent } from '../../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';
import { jobStructure } from '../../interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JobCardComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public allJobs: jobStructure[] = [];
  public displayJobs: jobStructure[] = [];
  public filterByLocation: boolean = false;
  public isDarkTheme: boolean = false;
  public title: string = '';
  public location: string = '';
  public isFullTime: boolean = false;
  public isSearchActive: boolean = false;

  private increment = 9;
  private currentIndex = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getJobsUrl().subscribe((data) => {
      this.allJobs = data;
      this.addMoreJobs();
    });

    this.appService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
    });
  }

  public checkInputsAndSearch(): void {
    if (!this.title && !this.location && !this.isFullTime)
      return this.resetDisplayJobs();
  }

  public toggleFilterByLocation() {
    this.filterByLocation = !this.filterByLocation;
  }

  public addMoreJobs(): void {
    const nextIndex = this.currentIndex + this.increment;
    this.displayJobs = [...this.displayJobs, ...this.allJobs.slice(this.currentIndex, nextIndex)];
    this.currentIndex = nextIndex;
  }

  public hasMoreJobs(): boolean {
    return this.currentIndex < this.allJobs.length;
  }

  public searchJobs() {
    if (this.title || this.location || this.isFullTime) {
      this.isSearchActive = true;
      this.appService.searchJobs(this.title, this.location, this.isFullTime).subscribe((jobs) => {
          this.displayJobs = jobs;
        });
    } else {
      this.resetDisplayJobs();
    }
  }

  private resetDisplayJobs() {
    this.currentIndex = 0;
    this.displayJobs = this.allJobs.slice(0, this.increment);
    this.isSearchActive = false;
  }
}

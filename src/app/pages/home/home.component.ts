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
  public jobs: jobStructure[] = [];
  public displayJobs: jobStructure[] = [];
  public filterByLocation: boolean = false;
  public isDarkTheme: boolean = false;
  public title: string = '';
  public location: string = '';
  public isFullTime: boolean = false;
  public isSearchActive: boolean = false;
  // Add a new array to store all jobs
  public allJobs: jobStructure[] = [];

  private increment = 9;
  private currentIndex = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;

      this.appService.getJobsUrl().subscribe((data) => {
        // this.allJobs = data;
        this.jobs = data;
        this.addMoreJobs();
      });
    });
  }

  public toggleFilterByLocation() {
    this.filterByLocation = !this.filterByLocation;
  }

  public addMoreJobs(): void {
    if (this.currentIndex < this.jobs.length) {
      const nextIndex = this.currentIndex + this.increment;
      this.displayJobs = this.displayJobs.concat(
        this.jobs.slice(this.currentIndex, nextIndex)
      );
      this.currentIndex = nextIndex;
    }
  }

  public hasMoreJobs(): boolean {
    return this.currentIndex < this.jobs.length;
  }

  public searchJobs() {
    if (this.title || this.location || this.isFullTime) {
      this.isSearchActive = true; // Search is active
      this.appService
        .searchJobs(this.title, this.location, this.isFullTime)
        .subscribe((jobs) => {
          this.displayJobs = jobs;
        });
    } else {
      this.resetDisplayJobs();
      this
    }
  }

  private resetDisplayJobs() {
    this.displayJobs = [];
    this.currentIndex = 0;
    this.isSearchActive = false; // Reset search state
    this.addMoreJobs(); // Re-add jobs based on the increment
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { jobStructure } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private jobsUrl = '/assets/data.json';
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  isDarkTheme = this.isDarkThemeSubject.asObservable();

  public getJobsUrl(): Observable<jobStructure[]> {
    return this.http.get<jobStructure[]>(this.jobsUrl);
  }

  public getJobById(id: number): Observable<jobStructure | undefined> {
    return this.getJobsUrl().pipe(
      map((jobs) => jobs.find((job) => job.id === id))
    );
  }

  public searchJobs(title: string, location: string, isFullTime: boolean): Observable<jobStructure[]> {
    return this.getJobsUrl().pipe(
      map((jobs) =>
        jobs.filter((job) => {
          // Normalize search terms to lowercase and remove whitespace
          const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '');
          const normalizedTitle = normalize(title);
          const normalizedLocation = normalize(location);
  
          const jobPosition = normalize(job.position);
          const jobCompany = normalize(job.company);
          const jobLocation = normalize(job.location);
  
          // Check if the job matches the title (position or company)
          const titleMatch = normalizedTitle
            ? jobPosition.includes(normalizedTitle) || jobCompany.includes(normalizedTitle)
            : true;
  
          // Check if the job matches the location
          const locationMatch = normalizedLocation
            ? jobLocation.includes(normalizedLocation)
            : true;
  
          // Check if the job matches the contract type (if isFullTime is true)
          const isFullTimeMatch = isFullTime
            ? job.contract === 'Full Time'
            : true;
  
          return titleMatch && locationMatch && isFullTimeMatch;
        })
      )
    );
  }

  public toggleTheme() {
    const currentTheme = this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(!currentTheme);
  }
}

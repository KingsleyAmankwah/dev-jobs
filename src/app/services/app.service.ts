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

  public searchJobs(
    title: string,
    location: string,
    isFullTime: boolean
  ): Observable<jobStructure[]> {
    return this.getJobsUrl().pipe(
      map((jobs) =>
        jobs.filter((job) => {
          const titleMatch = title
            ? job.position.toLowerCase().includes(title) || job.company.toLowerCase().includes(title)
            : // job.role.content.includes(title) ||
              // job.role.items.some((item) => item.includes(title))
              true;
          const locationMatch = location
            ? job.location.toLowerCase().includes(location)
            : true;
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

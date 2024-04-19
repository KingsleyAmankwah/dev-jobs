import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
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

  public toggleTheme() {
    const currentTheme = this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(!currentTheme);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
  isDarkTheme = this.isDarkThemeSubject.asObservable();

  public toggleTheme() {
    const currentTheme = this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(!currentTheme);
  }
}

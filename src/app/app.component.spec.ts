import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './services/app.service';
import { Renderer2 } from '@angular/core';

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockAppService: Partial<AppService>;
  let mockRenderer2: Partial<Renderer2>;
  let isDarkThemeSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isDarkThemeSubject = new BehaviorSubject<boolean>(false);

    // Mock AppService with Jest
    mockAppService = {
      isDarkTheme: isDarkThemeSubject.asObservable(),
      toggleTheme: jest.fn(),
    };

    // Mock Renderer2 with Jest
    mockRenderer2 = {
      setStyle: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        { provide: AppService, useValue: mockAppService },
        { provide: Renderer2, useValue: mockRenderer2 },
      ],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'dev-jobs' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Dev Jobs');
  });

  it('should toggle is Active and call toggleTheme on toggleButton method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const initialActiveState = app.isActive;
    app.toggleButton();
    expect(app.isActive).not.toBe(initialActiveState);
    expect(mockAppService.toggleTheme).toHaveBeenCalled();
  });

  it('should apply dark theme styles when isDarkTheme is true', () => {
    isDarkThemeSubject.next(true); // Simulate dark theme
    expect(mockRenderer2.setStyle).toHaveBeenCalledWith(document.body, 'backgroundColor', '#121721');
  });


  it('should apply light theme styles when isDarkTheme is false', () => {
    isDarkThemeSubject.next(false); // Ensure light theme
    expect(mockRenderer2.setStyle).toHaveBeenCalledWith(document.body, 'backgroundColor', '#f4f6f8');
  });

  
  it('should subscribe to isdarkeTheme and apply dark theme', () => {
    jest.clearAllMocks();

        // Simulate a theme change after component initialization
    isDarkThemeSubject.next(true); // Change to dark theme
    expect(mockRenderer2.setStyle).toHaveBeenCalledWith(document.body, 'backgroundColor', '#121721');
    
    isDarkThemeSubject.next(false); // Change to light theme
      expect(mockRenderer2.setStyle).toHaveBeenCalledWith(document.body, 'backgroundColor', '#f4f6f8');
  });
});

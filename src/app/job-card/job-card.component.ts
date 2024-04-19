import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppService } from '../services/app.service';
import { jobStructure } from '../interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job!: jobStructure;

  public isDarkTheme = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
    });
  }
}

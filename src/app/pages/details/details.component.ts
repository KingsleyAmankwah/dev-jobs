import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { jobStructure } from '../../interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  public isDarkTheme: boolean = false;
  public job!: jobStructure;

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');

    if (jobId) {
      this.appService.getJobById(parseInt(jobId)).subscribe((job) => {
        if (job) {
          this.job = job;
        } else {
          console.log('No job found');
        }
      });
    } else {
      console.log('No job id found');
    }

    this.appService.isDarkTheme.subscribe((darkTheme) => {
      this.isDarkTheme = darkTheme;
    });
  }
}

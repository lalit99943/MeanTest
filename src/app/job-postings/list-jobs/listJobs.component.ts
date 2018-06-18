import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Jobs } from '../jobs.model';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './listJobs.component.html',
  styleUrls: ['./listJobs.component.css']
})
export class ListJobsComponent implements OnInit, OnDestroy {
  jobs: Jobs[] = [];
  private jobsSub: Subscription;

  constructor(public jobsService: JobsService) {}

  ngOnInit() {
    this.jobsService.getJobs();
    this.jobsSub = this.jobsService.getJobsPostedListener()
      .subscribe((jobs: Jobs[]) => {
        this.jobs = jobs;
      });
  }

  onDelete(jobId: string) {
    this.jobsService.deleteJob(jobId);
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
  }
}

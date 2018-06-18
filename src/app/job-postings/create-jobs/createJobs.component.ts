import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JobsService } from '../jobs.service';
import { Jobs } from '../jobs.model';

@Component({
  selector: 'app-create-jobs',
  templateUrl: './createJobs.component.html',
  styleUrls: ['./createJobs.component.css']
})
export class CreateJobsComponent implements OnInit {
  enteredTitle = '';
  enteredDesc = '';
  job: Jobs;
  private mode = 'create';
  private jobId: string;

  constructor(public jobsService: JobsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('jobId')) {
        this.mode = 'edit';
        this.jobId = paramMap.get('jobId');
        this.job = this.jobsService.getJob(this.jobId);
      } else {
        this.mode = 'create';
        this.jobId = null;
        this.job = {'id': null, 'title': '', 'desc': ''};
      }
    });
  }


  onAddJob(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.jobsService.addJob(form.value.title, form.value.desc);
    } else {
      this.jobsService.updateJob(
        this.jobId,
        form.value.title,
        form.value.desc
      );
    }
    form.resetForm();
  }
}

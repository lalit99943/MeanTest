import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Jobs } from './jobs.model';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Jobs[] = [];
  private jobsPosted = new Subject<Jobs[]>();
  private serverUrl = 'http://localhost:3898/';

  constructor(private http: HttpClient) {}

  getJobs() {
    this.http.get<{ message: string; jobs: any }>(this.serverUrl + 'getJobs')
      .pipe(map((jobPostings) => {
        return jobPostings.jobs.map(job => {
          return {
            title: job.title,
            desc: job.desc,
            id: job._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.jobs = transformedPosts;
        this.jobsPosted.next([...this.jobs]);
      });
  }

  getJob(id: string) {
    return { ...this.jobs.find(p => p.id === id)};
  }

  getJobsPostedListener() {
    return this.jobsPosted.asObservable();
  }

  addJob(title: string, desc: string) {
    const job: Jobs = { id: null, title: title, desc: desc };
    this.http
      .post<{ message: string, jobId: string }>(this.serverUrl + 'postJob', job)
      .subscribe(responseData => {
        const id = responseData.jobId;
        job.id = id;
        this.jobs.push(job);
        this.jobsPosted.next([...this.jobs]);
      });
  }

  deleteJob(jobId: string) {
    this.http.delete(this.serverUrl + 'deleteJob/' + jobId)
      .subscribe(() => {
        const jobsNotDeleted = this.jobs.filter(job => job.id !== jobId);
        this.jobs = jobsNotDeleted;
        this.jobsPosted.next([...this.jobs]);
      });
  }

  updateJob(id: string, title: string, desc: string) {
    const job: Jobs = { id: id, title: title, desc: desc };
    this.http
      .put(this.serverUrl + 'updateJob/' + id, job)
      .subscribe(response => console.log(response));
  }
}

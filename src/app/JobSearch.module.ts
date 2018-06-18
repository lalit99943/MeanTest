import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
          MatInputModule,
          MatCardModule,
          MatButtonModule,
          MatToolbarModule,
          MatExpansionModule
        } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { JobSearchComponent } from './JobSearch.component';
import { ListJobsComponent } from './job-postings/list-jobs/listJobs.component';
import { CandidateInfoComponent } from './candidate-info/candidateInfo.component';
import { CreateJobsComponent } from './job-postings/create-jobs/createJobs.component';
import { AppHeaderComponent } from './header/appHeader.component';
import { JobsComponent } from './job-postings/jobs.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    JobSearchComponent,
    ListJobsComponent,
    CandidateInfoComponent,
    CreateJobsComponent,
    AppHeaderComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [JobSearchComponent]
})
export class JobSearchModule { }

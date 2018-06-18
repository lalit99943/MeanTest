import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListJobsComponent } from './job-postings/list-jobs/listJobs.component';
import { CreateJobsComponent } from './job-postings/create-jobs/createJobs.component';

const routes: Routes = [
  { path: '', component:  ListJobsComponent},
  { path: 'create', component:  CreateJobsComponent},
  { path: 'edit/:jobId', component: CreateJobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

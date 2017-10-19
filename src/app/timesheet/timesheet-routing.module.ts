import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TimesheetComponent} from './timesheet.component';
import { TimesheetDetailComponent } from './timesheet-detail/timesheet-detail.component';

const routes: Routes = [
  { path: '', component: TimesheetComponent },
  { path: ':id', component: TimesheetDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }

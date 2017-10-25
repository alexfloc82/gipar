import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AreaComponent} from './area.component';
import {AreaCoverageComponent} from './area-coverage/area-coverage.component';
import {AreaReportComponent} from './area-report/area-report.component';
import {AreaTimesheetComponent} from './area-timesheet/area-timesheet.component';
import { AreaMasterComponent } from './area-master/area-master.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';


const routes: Routes = [
  { path: '',    component: AreaComponent, children:[
    { path: '',    component: AreaCoverageComponent },
    { path: 'report',    component: AreaReportComponent },
    { path: 'coverage',    component: AreaCoverageComponent },
    { path: 'timesheet',    component: AreaTimesheetComponent },
    { path: 'master',    component: AreaMasterComponent },
    { path: 'master/:id',    component: AreaDetailComponent }

  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }

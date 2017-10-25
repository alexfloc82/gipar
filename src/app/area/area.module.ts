import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { AreaCoverageComponent } from './area-coverage/area-coverage.component';
import { AreaReportComponent } from './area-report/area-report.component';
import { AreaTimesheetComponent } from './area-timesheet/area-timesheet.component';
import { AreaService } from './area.service';
import {DataTableModule,SharedModule, ButtonModule} from 'primeng/primeng';
import { AreaMasterComponent } from './area-master/area-master.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';

import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,FormsModule,DataTableModule,SharedModule,ButtonModule,AutoCompleteModule,
    AreaRoutingModule
  ],
  declarations: [AreaComponent, AreaCoverageComponent, AreaReportComponent, AreaTimesheetComponent, AreaMasterComponent, AreaDetailComponent],
  providers: [AreaService]
})
export class AreaModule { }

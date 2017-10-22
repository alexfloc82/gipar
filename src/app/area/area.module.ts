import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { AreaCoverageComponent } from './area-coverage/area-coverage.component';
import { AreaReportComponent } from './area-report/area-report.component';
import { AreaTimesheetComponent } from './area-timesheet/area-timesheet.component';
import { AreaService } from './area.service';

@NgModule({
  imports: [
    CommonModule,FormsModule,
    AreaRoutingModule
  ],
  declarations: [AreaComponent, AreaCoverageComponent, AreaReportComponent, AreaTimesheetComponent],
  providers: [AreaService]
})
export class AreaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetDetailComponent } from './timesheet-detail/timesheet-detail.component';

import {DialogModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,FormsModule,DialogModule,
    TimesheetRoutingModule, NgbModule.forRoot()
  ],
  declarations: [TimesheetComponent, TimesheetDetailComponent]
})
export class TimesheetModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysComponent } from './holidays.component';
import { HolidaysDetailComponent } from './holidays-detail.component';

@NgModule({
  imports: [
    CommonModule,    
    HolidaysRoutingModule, FormsModule, NgbModule.forRoot()
  ],
  declarations: [HolidaysComponent,HolidaysDetailComponent]
})
export class HolidaysModule { }

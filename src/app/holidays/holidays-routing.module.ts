import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HolidaysComponent} from './holidays.component';
import {HolidaysDetailComponent} from './holidays-detail.component';

const routes: Routes = [
  { path: '',    component: HolidaysComponent },
   { path: ':user',    component: HolidaysDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaysRoutingModule { }

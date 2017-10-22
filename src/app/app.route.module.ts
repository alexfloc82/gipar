import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '',  redirectTo:'Home', pathMatch: 'full' },  
  { path: 'Home',  loadChildren: 'app/home/home.module#HomeModule'},
  { path: 'Proposal',  loadChildren: 'app/proposal/proposal.module#ProposalModule'},
  { path: 'Timesheet',  loadChildren: 'app/timesheet/timesheet.module#TimesheetModule'},
  { path: 'Timeoff',  loadChildren: 'app/holidays/holidays.module#HolidaysModule'},
  { path: 'Travel',  loadChildren: 'app/travel/travel.module#TravelModule'},
  { path: 'Area',  loadChildren: 'app/area/area.module#AreaModule'},
  { path: 'User',  loadChildren: 'app/user/user.module#UserModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {}
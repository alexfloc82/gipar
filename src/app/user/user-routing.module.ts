import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserComponent} from './user.component';
import {UserDetailComponent} from './user-detail.component';
import {UserSigninComponent} from './user-signin.component';
import {UserForgotComponent} from './user-forgot/user-forgot.component';
import {UserResetComponent} from './user-reset/user-reset.component';
import { UserEmailComponent } from './user-email/user-email.component';


const routes: Routes = [
  { path: '',    component: UserComponent },
  { path: ':id',    component: UserDetailComponent },
  { path: 'user/Signin',    component: UserSigninComponent },
  { path: 'user/Forgot',    component: UserForgotComponent },
  { path: 'user/Reset',    component: UserResetComponent },
  { path: 'user/emailChange',    component: UserEmailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

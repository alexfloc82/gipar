import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {AppRouteModule} from './app.route.module';
import {CoreModule} from './core/core.module';
import {HomeModule} from './home/home.module';

import { TimesheetModule } from './timesheet/timesheet.module';
import { ProposalModule } from './proposal/proposal.module';
import { SharedModule } from './shared/shared.module';
import { HolidaysModule } from './holidays/holidays.module';
import { UserModule } from './user/user.module';
import { AreaModule } from './area/area.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import {GrowlModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouteModule, CoreModule, TimesheetModule, ProposalModule, SharedModule, HolidaysModule, GrowlModule,
    UserModule, AreaModule, HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

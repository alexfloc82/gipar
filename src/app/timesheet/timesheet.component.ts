import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';

import { Timesheet, User, Proposal } from '../shared/datamodel';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: []
})

export class TimesheetComponent implements OnInit {
  today: Date;
  loader = { 'user': true, 'timesheet': true };
  timesheets: any[];
  fecha: any[];
  items: any[];
  orderedTimesheet: any[];

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute, ) {

    this.today = new Date();
    this.today.setDate(this.today.getDate() - 45);
    this.getTimesheets();
  }

  ngOnInit(): void {
  }

  private getTimesheets() {
    this.authService.user.subscribe(user =>{
    this.db.list('/timesheets', {query:{orderByChild:"user",equalTo:user.uid}}).subscribe(a => {
      this.timesheets = a;
      this.timesheets.sort(this.sortTS);
      this.timesheets.forEach(timesheet => {
        timesheet.date =  new Date(timesheet.year, timesheet.month, 1);
        timesheet.userObj = new User();
        this.db.object('/users/' + timesheet.user).subscribe(a => { 
          timesheet.userObj = a; 
          this.loader.user = false; });
        if (timesheet.incurridos) {
          timesheet.totalq1 = 0;
          timesheet.totalq2 = 0;
          timesheet.incurridos.forEach(incurrido => {
            timesheet.totalq1 = timesheet.totalq1 + Number(incurrido.q1);
            timesheet.totalq2 = timesheet.totalq2 + Number(incurrido.q2);
            incurrido.proposalObj = this.db.object('/proposals/' + incurrido.proposal);
          }
          );
        }
      }
      );
      this.loader.timesheet = false;
    }
    );
    })
  }

  sortTS(a: Timesheet, b: Timesheet) {
    if (a.year != b.year) {
      return a.year > b.year ? -1 : 1;
    }
    return a.month > b.month ? -1 : 1;
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

}

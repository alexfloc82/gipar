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
  //meses: TimesheetMesComponent[]
  today: Date;
  loader = { 'user': true, 'timesheet': true };
  timesheets: any[];
  fecha: any[];
  items: any[];
  orderedTimesheet: any[];

  constructor(
    // private timesheetDateService: TimesheetMeses,
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute, ) {

    this.today = new Date();
    this.today.setDate(this.today.getDate() - 5);
    this.getTimesheets();
  }

  ngOnInit(): void {
    //  this.getMeses();
  }

  private getTimesheets() {

    this.db.list('/timesheets').subscribe(a => {
      this.timesheets = a;
      this.timesheets.sort(this.sortTS);
      this.timesheets.forEach(timesheet => {
        timesheet.userObj = new User();
        this.db.object('/users/' + timesheet.user).subscribe(a => { timesheet.userObj = a; this.loader.user = false; });
        if (timesheet.incurridos) {
          timesheet.incurridos.forEach(incurrido => {
            incurrido.proposalObj = this.db.object('/proposals/' + incurrido.proposal);
          }
          );
        }
      }
      );
      this.loader.timesheet = false;
    }
    );
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

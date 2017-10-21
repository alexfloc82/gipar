import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';
import { AdminService } from '../core/utils/admin.service';

import { Timesheet, User, Proposal } from '../shared/datamodel';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: []
})

export class TimesheetComponent implements OnInit {
  today: Date;
  loader = { 'user': false, 'timesheet': false };
  timesheets: any[];
  fecha: any[];
  items: any[];
  filteredTimesheet: any[];
  isAdmin: boolean;
  filter:any;
  users: User[];

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private as: AdminService,
    private route: ActivatedRoute, ) {
      

    this.today = new Date();
    this.filter={user:"", year:this.today.getFullYear(), month:""};
    this.today.setDate(this.today.getDate() - 45);
    
    this.isAdmin = this.as.isChecked;
    this.db.list('/users').subscribe(users => this.users = users);
    this.getTimesheets(true);
  }

  ngOnInit(): void {
    this.as.check.subscribe(value => {
      this.isAdmin = value;
      this.getTimesheets(true);
    });
  }

  private getTimesheets(userFilter?:boolean) {

    this.authService.user.subscribe(user =>{
      
      if(userFilter){
        this.filter.user=user.uid;
      }

      let query={}

      if(!this.isAdmin){
        query ={orderByChild:"user",equalTo:user.uid}
      }

    this.db.list('/timesheets', {query:query}).subscribe(a => {
      this.loader = { 'user': true, 'timesheet': true };
      this.timesheets = a;
      this.timesheets.forEach(timesheet => {
        timesheet.date =  new Date(timesheet.year, timesheet.month, 1);
        timesheet.userObj = new User();
        this.db.object('/users/' + timesheet.user).subscribe(a => { 
          timesheet.userObj = a; 
          this.loader.user = false; });
        if (timesheet.incurridos) {
          timesheet.incurridos.forEach(incurrido => {
            incurrido.proposalObj = this.db.object('/proposals/' + incurrido.proposal);
          }
          );
        }
      }
      );
      this.filteredTimesheet = this.timesheets.filter(timesheet => 
        (timesheet.month == this.filter.month ||this.filter.month =="")
        &&(timesheet.year == this.filter.year ||this.filter.year =="")
        &&(timesheet.user == this.filter.user ||this.filter.user =="")
      );
      this.filteredTimesheet.sort(this.sortTS);
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';
import { User, Proposal, Holidays } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';
import { AdminService } from '../core/utils/admin.service';


@Component({
  selector: 'app-holliday',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  loader = { "user": true, "holiday": true };
  holidays: any[];
  filteredHolidays: any[];
  isAdmin: boolean;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private as: AdminService,
    private utils: UtilsService) {
    this.isAdmin = this.as.isChecked;
    this.getHolidays();
  }

  ngOnInit() {
    this.as.check.subscribe(value => {
      this.isAdmin = value;
      this.getHolidays();
    });
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  createNew() {
    this.router.navigate(['New'], { relativeTo: this.route });
  }

  onFilter(value: string) {
    this.filteredHolidays = this.holidays.filter(holiday =>
      holiday.userObj.adsuser.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      holiday.userObj.name.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      holiday.userObj.lastname.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1
    )
  }


  private getHolidays() {
    this.authService.user.subscribe(user => {

      let query = {}

      if (!this.isAdmin) {
        query = { orderByChild: "user", equalTo: user.uid }
      }
      this.loader = { "user": true, "holiday": true };
      this.db.list('/timeoffs', { query: query }).subscribe(a => {
        this.holidays = a;
        if(this.holidays.length == 0){this.loader = { "user": false, "holiday": false };}
        this.holidays.forEach(holiday => {
          holiday.holidayObj = new Holidays();
          holiday.userObj = new User();
          this.db.object('/users/' + holiday.user).subscribe(a => { holiday.userObj = a; this.loader.user = false; });
          this.db.object('/timeoffs/' + holiday.holiday).subscribe(a => { holiday.holidayObj = a; this.loader.holiday = false; });
        }
        );
        this.filteredHolidays = this.holidays;

      });
    });
  }
}


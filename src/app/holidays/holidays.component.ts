import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';
import { User, Proposal, Holidays  } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';


@Component({
   selector: 'app-holliday',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  loader = { "user": true, "holiday": true };
  holidays: any[];
  filteredHolidays: any[];
  
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService ) {
    this.getHolidays();
  }

  ngOnInit() {

  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  createNew(){
    this.router.navigate(['New'], { relativeTo: this.route });
  }

  onFilter(value: string) {
     this.filteredHolidays = this.holidays.filter(holiday =>
      holiday.userObj.adsuser.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||      
      holiday.userObj.name.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1|| 
      holiday.userObj.lastname.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1
      )
  }
  

  private getHolidays() {
    this.db.list('/timeoffs').subscribe(a => {
      this.holidays = a;      
      this.holidays.forEach(holiday => {
        holiday.holidayObj = new Holidays();
        holiday.userObj=new User();
        this.db.object('/users/' + holiday.user).subscribe(a => { holiday.userObj = a; this.loader.user = false; });
        this.db.object('/timeoffs/' + holiday.holiday).subscribe(a => { holiday.holidayObj = a; this.loader.holiday = false; });                
      }
      );
      this.filteredHolidays = this.holidays;

    });
  }

}


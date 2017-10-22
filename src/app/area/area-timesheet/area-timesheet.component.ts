import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Area, User} from '../../shared/datamodel';
import {AreaService} from '../area.service';

@Component({
  selector: 'app-area-timesheet',
  templateUrl: './area-timesheet.component.html',
  styleUrls: ['./area-timesheet.component.css']
})
export class AreaTimesheetComponent implements OnInit {
  area:string;
  year:number;
  month:number;
  users:User[];

  constructor(
    private db: AngularFireDatabase,  
    private as:AreaService
  ) { 
    this.as.areaObs.subscribe(a => this.getUsers());
    this.as.monthObs.subscribe(a => this.getUsers());
    this.as.yearObs.subscribe(a => this.getUsers());
    }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.area= this.as.area;
    this.month = this.as.month;
    this.year = this.as.year;
    this.db.list('/users',{query:{orderByChild:"area",equalTo:this.area}}).subscribe(users => {
      this.users = users.sort(this.sortUser);
      this.users.forEach(user => this.getTimesheet(user))}
    );
  }

  getTimesheet(user:User){
    this.db.list('/timesheets',{query:{orderByChild:"user",equalTo:user.uid}}).subscribe(timsheets =>{
      let filteredTS = timsheets.filter(timesheet => timesheet.year == this.year && timesheet.month == this.month);
      user['q1'] = 0;
      user['q2'] = 0;
      filteredTS.forEach(timesheet => {
        timesheet.incurridos.forEach(incurrido => {
          user['q1'] = user['q1'] +Number(incurrido.q1);
          user['q2'] = user['q2'] +Number(incurrido.q2);
        });
      });
    })
  }

  sortUser(a:User, b:User){
    return a.lastname.toLowerCase() > b.lastname.toLowerCase()? 1:-1;
  }

}

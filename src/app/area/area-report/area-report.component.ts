import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Area, User,Incurrido, Timesheet} from '../../shared/datamodel';
import {AreaService} from '../area.service';

@Component({
  selector: 'app-area-report',
  templateUrl: './area-report.component.html',
  styleUrls: ['./area-report.component.css']
})
export class AreaReportComponent implements OnInit {
  area:string;
  year:number;
  month:number;
  users:any[];
  times:any[];

  constructor(
    private db: AngularFireDatabase,  
    private as:AreaService
  ) { 
    this.as.areaObs.subscribe(a => this.getUsers());
    this.as.monthObs.subscribe(a => this.getUsers());
    this.as.yearObs.subscribe(a => this.getUsers());
    this.times = [{adsuser:'1',time:2,proposal:'3'}];
    }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.area= this.as.area;
    this.month = this.as.month;
    this.year = this.as.year;
    this.times = [];
    this.db.list('/users',{query:{orderByChild:"area",equalTo:this.area}}).subscribe(users => {
      this.users = users.sort(this.sortUser);
      this.users.forEach(user => this.getTimesheet(user))}
    );
  }

  getTimesheet(user:User){
    this.db.list('/timesheets',{query:{orderByChild:"user",equalTo:user.uid}}).subscribe(timsheets =>{
      let filteredTS = timsheets.filter(timesheet => (timesheet.year == this.year || this.year == 0)&& (timesheet.month == this.month || this.month == -1));
      filteredTS.forEach(timesheet => {
        timesheet.incurridos.forEach(incurrido => {if(incurrido.proposal != "VAC" && incurrido.proposal != "ADJ"){this.getProposal(user,incurrido, timesheet)}
      });
      });
    })
  }
  getProposal(user:User, incurrido:Incurrido, timesheet:Timesheet){
    this.db.object('/proposals/' + incurrido.proposal).subscribe(proposal => {
      let register:any = {};
      register.month = Number(timesheet.month) +1;
      register.year = timesheet.year;
      register.adsuser = user.adsuser;
      register.name = user.name;
      register.lastname = user.lastname;
      register.id = proposal.id;
      register.pm = incurrido.pm;
      register.q1 = Number(incurrido.q1);
      register.q2 = Number(incurrido.q2);
      register.total = Number(incurrido.q1) + Number(incurrido.q2);
      this.times.push(register);
    })
    

  }

  sortUser(a:User, b:User){
    return a.lastname.toLowerCase() > b.lastname.toLowerCase()? 1:-1;
  }

}

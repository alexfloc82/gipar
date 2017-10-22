import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Area, User} from '../../shared/datamodel';
import {AreaService} from '../area.service';

@Component({
  selector: 'app-area-coverage',
  templateUrl: './area-coverage.component.html',
  styleUrls: ['./area-coverage.component.css']
})
export class AreaCoverageComponent implements OnInit {
  area:string;
  year:number;
  users:User[];

  constructor(
    private db: AngularFireDatabase,  
    private as:AreaService
  ) { 
    this.as.areaObs.subscribe(a => this.getUsers());
    this.as.yearObs.subscribe(a => this.getUsers());
    }

  ngOnInit() {
    this.area= this.as.area;
    this.year = this.as.year;
    this.getUsers();
  }

  getUsers(){
    this.area= this.as.area;
    this.year = this.as.year;
    this.db.list('/users',{query:{orderByChild:"area",equalTo:this.area}}).subscribe(users => {
      this.users = users.sort(this.sortUser);
      this.users.forEach(user => this.getCoverage(user))}
    );
  }

  getCoverage(user:User){
    this.db.list('/proposals').subscribe(proposals =>{
      user.coverage = 0;
      proposals.forEach(proposal => {
        proposal.estimates.forEach(estimate => {
          if(estimate.user == user.uid && Number(estimate.year) == this.year){
            user.coverage = user.coverage + Number(estimate.hours);
          }
        });
      });
      user.coverage;
    })
  }

  sortUser(a:User, b:User){
    return a.lastname.toLowerCase() > b.lastname.toLowerCase()? 1:-1;
  }

}

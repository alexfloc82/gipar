import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../shared/datamodel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loader=false;
  users: any[];
  filteredUsers: any[];

  constructor(
    private db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,) {
   

  }

  ngOnInit() {
    this.loader=true;
    this.db.list('/users').subscribe(a => {
      this.users = a; 
      this.users.forEach(user => this.getArea(user));
      this.users.sort(this.sortBylastName);
      this.filteredUsers = a; 
      this.loader=false;});
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onFilter(value:string){
    this.filteredUsers = this.users.filter(user => 
        user.adsuser.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.name.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.email.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
        user.lastname.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1)
  }

  getArea(user : User){
    this.db.object('/areas/'+user.area).subscribe(area => user['areaName']=area.name);
  }

  sortBylastName(p1:User, p2:User){
    return p1.lastname.toLocaleLowerCase() > p2.lastname.toLocaleLowerCase()? 1:-1;
  }

}

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../../core/utils/utils.service';
import { MessageService } from '../../core/message/message.service';

import { User, Area } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {
  loader = false; //to control loading
  area: FirebaseObjectObservable<any>; //To keep reference to database Object
  users: User[]; // list of elegible users   
  filteredUsers: User[];     
  form: Area; //form data   

  constructor(
      private db: AngularFireDatabase,
      private route: ActivatedRoute,
      private router:Router,
      private location: Location,
      private utils: UtilsService,
      public messageService: MessageService) {
      
      this.loader = true;
      this.db.list('/users').subscribe(a => this.users = a.filter(user => user.role == "Admin" || user.role == "E-Team"));

  }

  ngOnInit() {
      this.route.paramMap.forEach(
          param => {
              // new area                                
              if (param.get('id') == '-') {
                  let now = new Date().toISOString();
                  this.form = new Area();
                  this.loader = false;
              }
              // Editing holiday
              else {
                  this.area = this.db.object('/areas/' + param.get('id'))
                  this.area.subscribe(
                      a => {
                          this.form = a;                            
                          this.loader = false;
                      }
                  )
              }
          }
      );
  }

  goBack(): void {
      this.router.navigate(['Area/master']);
  }

  onSubmit() {                
    if(this.form.responsibles)
    {this.form.responsibles.forEach(resp => delete resp["_$visited"])}
    //Update object in database
    if (this.area) {
        this.area.update(this.form).then(a => this.router.navigate(['Area/master'])).catch(
            err => this.messageService.sendMessage(err.message, 'error')
        );
    }
    //Create new object
    else {
        this.db.list('/areas').push(this.form).then(a => this.router.navigate(['Area/master'])).catch(
            err => this.messageService.sendMessage(err.message, 'error')
        );;
    }              

  }

  delete(){
      this.area.remove().then(a => this.router.navigate(['Area/master'])).catch(
              err => this.messageService.sendMessage(err.message, 'error')
          );;
  }
  
  search(event) {
    let query = event.query;
    this.filteredUsers = this.users.filter(user =>
    user.lastname.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    user.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
}
}

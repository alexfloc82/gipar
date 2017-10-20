import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../../core/utils/utils.service';
import { MessageService } from '../../core/message/message.service';
import { AuthService } from '../../core/auth/auth.service';

import * as firebase from 'firebase';

import { User, Proposal, Travel, Timesheet, Area, Incurrido } from '../../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-timesheet-detail',
  templateUrl: './timesheet-detail.component.html',
  styleUrls: ['./timesheet-detail.component.css']
})
export class TimesheetDetailComponent implements OnInit {

  loader = false; //to control loading
  timesheet: FirebaseObjectObservable<any>; //To keep reference to database Object
  users: User[]; // list of elegible users
  areas: { key: string, value: string }[] = [];
  selectedUser: User; // Curently selected user
  selectedResources: User[];
  form: Timesheet; //form data
  proposals: Proposal[];
  today: Date;
  pms: any[];
  disable: boolean;


  constructor(private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private location: Location,
    public utils: UtilsService,
    public authService: AuthService,
    public messageService: MessageService) {
    this.loader = true;
    this.db.list('/users').subscribe(a => this.users = a);
    this.authService.user.subscribe(user =>
      this.db.list('/proposals').subscribe(a => this.proposals = a.filter(proposal => {
        if (!proposal.estimates) { return false; }
        return proposal.estimates.filter(estimate => { return estimate.user == user.uid; }).length > 0 ? true : false;
      }
      ))
    )
    this.db.list('/areas').subscribe(areas => areas.forEach(area => this.areas.push({ key: area.$key, value: area.id })));
  }

  ngOnInit() {
    this.today = new Date();
    this.pms = [];
    this.route.paramMap.forEach(
      param => {
        // new proposal
        if (param.get('id') == '-') {
          this.disable = false;
          this.form = new Timesheet();
          this.form.month = this.today.getMonth();
          this.form.year = this.today.getFullYear();
          this.authService.userProfile.subscribe(user => {
            this.db.object('/users/' + user.$key).subscribe(user => {
              this.selectedUser = user;
              this.form.user = user.$key;
            });
          }
          );
          this.loader = false;
        }
        // Editing proposal
        else {
          this.disable = true;
          this.timesheet = this.db.object('/timesheets/' + param.get('id'))
          this.timesheet.subscribe(
            a => {
              this.form = a;
              this.db.object('/users/' + a.user).subscribe(b => this.selectedUser = b);

              if (a.incurridos) {
                a.incurridos.forEach((incurrido, index) => {
                  this.db.list('/proposals/' + incurrido.proposal + '/pms').subscribe(
                    pms => this.pms.push(pms)
                  )
                })
              }
              this.loader = false;
            }
          )
        }
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    //Update object in database
    if (this.timesheet) {
      this.timesheet.update(this.form).then(a => this.location.back()).catch(
        err => this.messageService.sendMessage(err.message, 'error')
      );
    }
    //Create new object
    else {
      let key = this.form.user + this.form.month + this.form.year;
      let obj = {};
      obj[key] = this.form;
      firebase.database().ref('/timesheets/').once('value', snapshot =>{
        if(snapshot.hasChild('/'+key))
        {
          this.messageService.sendMessage('Timesheet already exists', 'error');
        }
        else{
          this.db.object('/timesheets').update(obj).then(a => this.location.back()).catch(
            err => this.messageService.sendMessage(err.message, 'error')
          );
        }
      });
     
    }
  }

  delete() {
    this.timesheet.remove().then(a => this.location.back())
      .catch(err => this.messageService.sendMessage(err.message, 'error'))
      .then(a => this.messageService.sendMessage('Timesheet has been deleted', 'success'))
  }

  usearch = (text$: Observable<string>) =>
    map.call(debounceTime.call(text$, 200),
      term => term === '' ? [] : this.users.filter(user => (user.adsuser + ' - ' + user.name + ' ' + user.lastname).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  uformatter = (user: User) => user.adsuser + ' - ' + user.name + ' ' + user.lastname;

  selectUser(selectedItem: any) {
    this.form.user = selectedItem.item.$key;
  }

  addIncurrido() {
    if (!this.form.incurridos) {
      this.form.incurridos = [];
    }
    this.form.incurridos.push(new Incurrido());
  }

  deleteIncurrido(index: number) {
    this.form.incurridos.splice(index, 1);
  }

  selectProposal(index: number) {
    this.db.list('/proposals/' + this.form.incurridos[index].proposal + '/pms').subscribe(
      pms => this.pms[index] = pms
    )
  }


}

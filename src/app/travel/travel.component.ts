import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../core/auth/auth.service';
import { User, Proposal, Travel } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';
import { AdminService } from '../core/utils/admin.service';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  loader = { "user": true, "travel": true };
  travels: any[];
  filteredTravels: any[];
  isAdmin: boolean;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    public authService: AuthService,
    private as: AdminService,
    private route: ActivatedRoute,
    private utils: UtilsService) {
    this.isAdmin = this.as.isChecked;
    this.getTravels();
  }

  ngOnInit() {
    this.as.check.subscribe(value => {
      this.isAdmin = value;
      this.getTravels();
    });
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  createNew() {
    this.router.navigate(['-'], { relativeTo: this.route });
  }

  onFilter(value: string) {
    this.filteredTravels = this.travels.filter(travel =>
      travel.userObj.adsuser.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      travel.userObj.name.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      travel.userObj.lastname.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      travel.finish.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      travel.proposalObj.id.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1 ||
      travel.start.toLowerCase().indexOf(value['target'].value.toLowerCase()) > -1)
  }

  private getTravels() {
    this.authService.user.subscribe(user => {

      let query = {}

      if (!this.isAdmin) {
        query = { orderByChild: "user", equalTo: user.uid }
      }
      this.loader = { "user": true, "travel": true };
      this.db.list('/travels', { query: query }).subscribe(a => {
        this.travels = a;
        this.travels.forEach(travel => {
          travel.userObj = new User();
          travel.proposalObj = new Proposal();
          this.db.object('/users/' + travel.user).subscribe(a => { travel.userObj = a; this.loader.user = false; });
          this.db.object('/proposals/' + travel.proposal).subscribe(a => { travel.proposalObj = a; this.loader.travel = false; });
        }
        );
        this.filteredTravels = this.travels;

      });
    });
  }

}

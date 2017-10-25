import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../core/auth/auth.service';
import { User, Proposal, Holidays, Area } from '../../shared/datamodel';
import { UtilsService } from '../../core/utils/utils.service';
import { AdminService } from '../../core/utils/admin.service';


@Component({
  selector: 'app-area-master',
  templateUrl: './area-master.component.html',
  styleUrls: ['./area-master.component.css']
})
export class AreaMasterComponent implements OnInit {

  loader: boolean = true;
  areas: Area[];
  filteredAreas: any[];

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService) {
    this.getAreas();
  }

  ngOnInit() {
    this.getAreas();
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  createNew() {
    this.router.navigate(['-'], { relativeTo: this.route });
  }

  onFilter(value: string) {
    this.filteredAreas = this.areas.filter(area => true);
  }


  private getAreas() {
    this.loader = true;
    this.db.list('/areas', ).subscribe(a => {
      this.areas = a;
      this.filteredAreas =  this.areas; 
      this.loader = false;
    });
  }
}
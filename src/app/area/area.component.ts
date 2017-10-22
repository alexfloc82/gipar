import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import {Area} from '../shared/datamodel';
import {AreaService} from './area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  selectedItem:string;
  loader:boolean;
  query:any;
  areas:Area[];

  constructor(private db: AngularFireDatabase,  
    private as:AreaService
  ) { 
    let today= new Date();
    this.query={area:null,month:today.getMonth(), year:today.getFullYear()};
    this.as.setYear(today.getFullYear());
    this.as.setMonth(today.getMonth());
    db.list('/areas').subscribe(areas => {
      this.areas = areas;
      this.query.area = areas[0].$key;
      this.as.setArea(areas[0].$key);});
  }

  ngOnInit() {
    this.loader = true; 
    this.selectedItem = 'Coverage';
    this.loader = false; 
  }

  selectItem(selectedItem: any) {
    this.selectedItem = selectedItem;
  }

  onAreaSelect(){
    this.as.setArea(this.query.area);
  }

  onYearSelect(){
    this.as.setYear(Number(this.query.year));
  }

  onMonthSelect(){
    this.as.setMonth(Number(this.query.month));
  }

}

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject'

@Injectable()
export class AreaService {
  area:string;
  areaObs:Subject<string>;
  year:number;
  yearObs:Subject<number>;
  month:number;
  monthObs:Subject<number>;

  constructor() { 
    this.area = "";
    this.areaObs = new Subject(); 
    this.year = new Date().getFullYear();
    this.yearObs = new Subject(); 
    this.month = new Date().getMonth();
    this.monthObs = new Subject(); 
  }

  setArea(area:string){
    this.area = area;
    this.areaObs.next(this.area);
  }

  setYear(year:number){
    this.year = year;
    this.yearObs.next(this.year);
  }

  setMonth(month:number){
    this.month = month;
    this.monthObs.next(this.month);
  }

}

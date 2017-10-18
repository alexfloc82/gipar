import {Injectable} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class UtilsService {

  convertNgbDateToISO(ngbDate: NgbDateStruct ){
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).toISOString();
  }

  convertISOToNgbDate(isodate:string){ 
    var date = new Date(isodate);
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate()};
  }

  comparefechas(dia1,mes1,year1,dia2,mes2,year2)
    {        
        var fecha1 = new Date(year1,mes1-1,dia1);
        var fecha2 = new Date(year2,mes2-1,dia2);        
        if(fecha1 > fecha2){            
            return false;
        }
        else
        {                       
            return true;
        }
    }
}
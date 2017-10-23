import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class UtilsService {

    convertNgbDateToISO(ngbDate: NgbDateStruct) {
        return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).toISOString();
    }

    convertISOToNgbDate(isodate: string) {
        var date = new Date(isodate);
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate() };
    }

    comparefechas(dia1, mes1, year1, dia2, mes2, year2) {
        var fecha1 = new Date(year1, mes1 - 1, dia1);
        var fecha2 = new Date(year2, mes2 - 1, dia2);
        if (fecha1 > fecha2) {
            return false;
        }
        else {
            return true;
        }
    }

    getTimeRange(day1: Date, day2: Date):number {
        var range: Date[] = [];
        var nextDay = day1;
        while (nextDay <= day2) {
            var theday = new Date();
            theday = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
            range.push(theday);
            nextDay.setDate(nextDay.getDate() + 1);
        }
        let time: number = 0;
        range.forEach(day => {
            switch (day.getDay()) {
                case 1:
                case 2:
                case 3:
                case 4:
                    switch (day.getMonth()) {
                        case 6:
                        case 7:
                            time = time + 7;
                            break;
                        case 8:
                            day.getDate() < 16 ?
                                time = time + 7 :
                                time = time + 9;
                            break;
                        default:
                            time = time + 9;
                            break;
                    }
                    break;
                case 5:
                    time = time + 6.5;
                    break;

                default:
                    break;
            }
        });
        return time;
    }
}
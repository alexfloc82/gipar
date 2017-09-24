import { Injectable } from '@angular/core';

<<<<<<< HEAD
@Injectable()
export class timesheet_dateService {

  constructor() { }

}
=======
export const MESES: TimesheetMesComponent[] = [
    {id: '01', name: 'JANUARY'},
    {id: '02', name: 'FEBRUARY'},
    {id: '03', name: 'MARCH'},
    {id: '04', name: 'APRIL'},
    {id: '05', name: 'MAY'},
    {id: '06', name: 'JUNE'},
    {id: '07', name: 'JULY'},
    {id: '08', name: 'AUGUST'},
    {id: '09', name: 'SEPTEMBER'},
    {id: '10', name: 'OCTOBER'},
    {id: '11', name: 'NOVEMBER'},
    {id: '12', name: 'DECEMBER'}
  ];

@Injectable()
export class TimesheetMesComponent {
  id: string;
  name: string;
}

export class TimesheetMeses {
  getMeses(): Promise<TimesheetMesComponent[]> {
      return Promise.resolve(MESES)
  }
}
>>>>>>> 912db7428e2bb8a439dd85af859850cc7cbb1054

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { UtilsService } from '../core/utils/utils.service';
import { MessageService } from '../core/message/message.service';

import { User, Holidays } from '../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';


@Component({
    selector: 'app-holidays',
    templateUrl: './holidays-detail.component.html',
    styleUrls: ['./holidays-detail.component.css'],
    providers: []
})
export class HolidaysDetailComponent implements OnInit {
    loader = false; //to control loading
    holiday: FirebaseObjectObservable<any>; //To keep reference to database Object
    holidays: Holidays[]; // list of eligible proposals
    users: User[]; // list of elegible users        
    selectedUser: User; // Curently selected user
    form: Holidays; //form data
    filteredHolidays: any[];    

    constructor(
        private db: AngularFireDatabase,
        private route: ActivatedRoute,
        private router:Router,
        private location: Location,
        private utils: UtilsService,
        public messageService: MessageService) {
        
        this.loader = true;
        this.db.list('/timeoffs').subscribe(b => this.holidays = b);
        this.db.list('/users').subscribe(a => this.users = a);


    }

    ngOnInit() {
        this.route.paramMap.forEach(
            param => {
                // new holiday                                
                if (param.get('user') == 'New') {
                    let now = new Date().toISOString();
                    this.form = new Holidays(now, this.utils.convertISOToNgbDate(now));
                    this.loader = false;
                }
                // Editing holiday
                else {
                    this.holiday = this.db.object('/timeoffs/' + param.get('user'))
                    this.holiday.subscribe(
                        a => {
                            this.form = a;                            
                            this.db.object('/users/' + a.user).subscribe(b => this.selectedUser = b);
                            this.loader = false;
                        }
                    )
                }
            }
        );
    }

    goBack(): void {
        this.router.navigate(['Timeoff']);
    }

    onSubmit() {                
        if(this.form.user==''||this.form.type=='')
        {            
            this.messageService.sendMessage("Input user and time off type", 'error')
            return false;
        }
        else{
            if(!this.utils.comparefechas(this.form.fromDate.day,this.form.fromDate.month,this.form.fromDate.year,
                           this.form.toDate.day,this.form.toDate.month,this.form.toDate.year ))
            {                
                this.messageService.sendMessage("Initial date greater than end date", 'error')
                return false;
            }
            this.form.to = this.utils.convertNgbDateToISO(this.form.toDate);
            this.form.from = this.utils.convertNgbDateToISO(this.form.fromDate);
            //Update object in database
            if (this.holiday) {
                this.holiday.update(this.form).then(a => this.router.navigate(['Timeoff'])).catch(
                    err => this.messageService.sendMessage(err.message, 'error')
                );
            }
            //Create new object
            else {
                this.db.list('/timeoffs').push(this.form).then(a => this.router.navigate(['Timeoff'])). catch(
                    err => this.messageService.sendMessage(err.message, 'error')
                );;
            }
        }                

    }

    /*comparefechas(dia1,mes1,year1,dia2,mes2,year2)
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
    }*/

    delete(){
        this.holiday.remove().then(a => this.location.back()).catch(
                err => this.messageService.sendMessage(err.message, 'error')
            );;
    }


    addHolidays()
    {
        alert('Save Holidays');
    }


    //Uer typeahead
    usearch = (text$: Observable<string>) =>
        map.call(debounceTime.call(text$, 200),
            term => term === '' ? [] : this.users.filter(user => (user.adsuser + ' - ' + user.name + ' ' + user.lastname).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    uformatter = (user: User) => user.adsuser + ' - ' + user.name + ' ' + user.lastname;

    selectUser(selectedItem: any) {
        this.form.user = selectedItem.item.$key;
    }   

}

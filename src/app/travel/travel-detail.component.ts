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

import { User, Proposal, Travel } from '../shared/datamodel';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-user',
    templateUrl: './travel-detail.component.html',
    styleUrls: ['./travel-detail.component.css'],
    providers: []
})
export class TravelDetailComponent implements OnInit {
    loader = false; //to control loading
    travel: FirebaseObjectObservable<any>; //To keep reference to database Object
    users: User[]; // list of elegible users
    proposals: Proposal[]; // list of eligible proposals
    selectedProposal: Proposal; // Currently selected proposal
    selectedUser: User; // Curently selected user
    form: Travel; //form data

    constructor(
        private db: AngularFireDatabase,
        private route: ActivatedRoute,
        private location: Location,
        private router:Router,
        private utils: UtilsService,
        public messageService: MessageService) {
        
        this.loader = true;
        this.db.list('/proposals').subscribe(b => this.proposals = b);
        this.db.list('/users').subscribe(a => this.users = a);


    }

    ngOnInit() {
        this.route.paramMap.forEach(
            param => {
                // new travel
                if (param.get('id') == '-') {
                    let now = new Date().toISOString();
                    this.form = new Travel(now, this.utils.convertISOToNgbDate(now));
                    this.loader = false;
                }
                // Editing travel
                else {
                    this.travel = this.db.object('/travels/' + param.get('id'))
                    this.travel.subscribe(
                        a => {
                            this.form = a;
                            this.db.object('/proposals/' + a.proposal).subscribe(b => this.selectedProposal = b);
                            this.db.object('/users/' + a.user).subscribe(b => this.selectedUser = b);
                            this.loader = false;
                        }
                    )
                }
            }
        );
    }

    goBack(): void {
        this.router.navigate(['Travel']);
    }

    onSubmit() {
        this.form.finish = this.utils.convertNgbDateToISO(this.form.finishDate);
        this.form.start = this.utils.convertNgbDateToISO(this.form.startDate);
        //Update object in database
        if (this.travel) {
            this.travel.update(this.form).then(a => this.router.navigate(['Travel'])).catch(
                err => this.messageService.sendMessage(err.message, 'error')
            );
        }
        //Create new object
        else {
            this.db.list('/travels').push(this.form).then(a => this.router.navigate(['Travel'])).catch(
                err => this.messageService.sendMessage(err.message, 'error')
            );;
        }

    }

    delete(){
        this.travel.remove().then(a => this.location.back()).catch(
                err => this.messageService.sendMessage(err.message, 'error')
            );;
    }

    //Proposal typeahead
    psearch = (text$: Observable<string>) =>
        map.call(debounceTime.call(text$, 200),
            term => term === '' ? [] : this.proposals.filter(v => v.id.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    pformatter = (proposal: Proposal) => proposal.id;

    selectProposal(selectedItem: any) {
        this.form.proposal = selectedItem.item.$key;
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

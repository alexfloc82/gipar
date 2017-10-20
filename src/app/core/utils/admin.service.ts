import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import {Component} from '@angular/core';

@Injectable()
export class AdminService {
    check  = new Subject<any>();
    isChecked: boolean;

    toggle(isChecked:boolean){
        this.isChecked = isChecked;
        this.check.next(isChecked);
    }
    constructor() {}
}
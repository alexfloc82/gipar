import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import {Component} from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {MessageService as MsgService} from 'primeng/components/common/messageservice';


@Injectable()
export class MessageService {
    emitter  = new Subject<any>();

    getMessage(): Observable<any> {
        return this.emitter.asObservable();
    }

    constructor(private msgService: MsgService) {}
    
    sendMessage(message:string, type:string) {
        let summary:string;
        
        switch (type) {
            case 'error':
                summary = 'Error';
                break;
                case 'warning':
                summary = 'Atención';
                break;
                case 'success':
                summary = 'Exito';
                break;
                case 'info':
                summary = 'Info';
                break;
            default:
                break;
        }
        this.msgService.add({severity:type, summary:summary, detail:message});
    }
        
    clearMessage() {
        this.msgService.clear();
    }
}
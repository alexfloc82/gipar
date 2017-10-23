import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../core/question/question-base';
import { QuestionControlService } from '../core/question/question-control.service';
import { AuthService } from '../core/auth/auth.service';
import {MessageService} from '../core/message/message.service';

import { UserSigninQuestionService } from './user-signin-question.service';


@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
    providers: [UserSigninQuestionService]
})
export class UserSigninComponent implements OnInit {
    questions: any[];
    form: FormGroup;

    constructor(
        private qcs: QuestionControlService,
        service: UserSigninQuestionService,
        private auth: AuthService,
        private location: Location,
        private messageService: MessageService) {
        this.questions = service.getQuestions();
    }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
    }

    goBack(): void {
        this.location.back();
    }

    onSubmit() {

        if (this.form.value['password'] == this.form.value['confirm']) {
            if(this.form.value['email'].indexOf('@airbus.com') > 1){
                this.messageService.sendMessage("Please don't use your Airbus account. You should use Accenture or Avanade account", 'error');
                return false;
            }


            this.auth.signup(
                this.form.value['email'],
                this.form.value['password'],
                this.form.value['name'],
                this.form.value['lastname'],
                this.form.value['adsuser']);
        }
        else {
            this.messageService.sendMessage("Password doesn't match", 'error')
        }

    }

}

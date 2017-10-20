import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth/auth.service';
import { QuestionControlService }    from './question/question-control.service';
import {MessageService} from './message/message.service';
import {MessageService as MsgService} from 'primeng/components/common/messageservice';
import { UtilsService } from './utils/utils.service';
import { AdminService } from './utils/admin.service';

import { DynamicFormQuestionComponent } from '../core/question/dynamic-form-question.component';

@NgModule({
  declarations: [DynamicFormQuestionComponent
  ],
  exports:[DynamicFormQuestionComponent],
  imports: [
   NgbModule.forRoot(), HttpModule, FormsModule, CommonModule, ReactiveFormsModule
  ],
  providers:[AuthService, AngularFireDatabase, QuestionControlService,MsgService, MessageService, UtilsService, AdminService]
})
export class CoreModule { }

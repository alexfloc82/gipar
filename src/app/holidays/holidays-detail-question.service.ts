import { Injectable }       from '@angular/core';

import { QuestionBase, TextboxQuestion, DropdownQuestion }     from '../core/question/question-base';

@Injectable()
export class TravelDetailQuestionService {

  // Todo: get from a remote source of question metadata∫
  // Todo: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'First name',
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastname',
        label: 'Last name',
        order: 2
      }),

      new TextboxQuestion({
        key: 'adsuser',
        label: 'ADS User',
        order: 3
      }),

      new DropdownQuestion({
        key: 'role',
        label: 'Role',
        value: 'Standard',
        options: [
          {key: 'Admin',  value: 'Admin'},
          {key: 'E-Team',  value: 'E-Team'},
          {key: 'Standard',   value: 'Standard'}
        ],
        order: 4
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageService } from '../../core/message/message.service';

@Component({
  selector: 'app-user-reset',
  templateUrl: './user-reset.component.html',
  styleUrls: ['./user-reset.component.css']
})
export class UserResetComponent implements OnInit {
  loader = false;
  email: string;
  password:string;
  confirm:string;
  code:string;
  
    constructor(public authService: AuthService, 
      private route: ActivatedRoute,
      private router: Router,
      private auth: AngularFireAuth,
     private messageService: MessageService) { }

  ngOnInit() {
    this.route.paramMap.forEach(
      param => {
        // reset password
        if (param.get('code')=='-') {
          this.authService.user.subscribe(user => this.email = user.email);
          this.code = '';
        }
        // Editing tarea
        else {
          this.auth.auth.verifyPasswordResetCode(param.get('code'))
          .then(a => {
            this.email = a;
          })
          .catch(err => {
            this.messageService.sendMessage(err.message, 'error');
            this.email = "";
          }
          );
          this.code = param.get('code') ;
        }
      }
    );

  }

  resetPassword()
  {
    if(this.password == this.confirm){
      this.authService.resetPass(this.password, this.code);
    }
    else{
      this.messageService.sendMessage('La contraseña no coincide', 'error');
    }
  }

}

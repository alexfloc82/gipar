import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import {MessageService} from '../../core/message/message.service';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.css']
})
export class UserEmailComponent implements OnInit {
  email: string;
  password: string;
  newEmail: string;

  constructor(public authService: AuthService, private messageService:MessageService) {
  }

  ngOnInit() {
  }

  login() {
    if(this.newEmail.indexOf('@airbus.com') > 0){
      this.messageService.sendMessage("Please don't use your Airbus account. You should use Accenture or Avanade account", 'error');
      return false;
  }
  else{
    this.authService.changeEmail(this.email, this.password, this.newEmail);
  }
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { AdminService } from '../core/utils/admin.service';
import {MessageService} from '../core/message/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(public authService: AuthService,
    private router: Router,
    private as: AdminService,
  private messageService:MessageService) {
    this.isAdmin = this.as.isChecked;
  }

  ngOnInit() {
    this.as.check.subscribe(value => {
      this.isAdmin = value;
    });
  }

  gotoMenu(menu: string): void {
    this.router.navigate([menu]);
  }

  signIn() {
    this.router.navigate(['/user', 'Signin']);
  }

  login() {
    if(this.email.indexOf('@airbus.com') > 0){
      this.messageService.sendMessage("You should not use an airbus account. Please use Accenture or Avanade Account instead", 'error');
      this.router.navigate(['user/emailChange']);
    }
    else{
      this.authService.login(this.email, this.password);
      this.email = this.password = '';
    }
  }

  resetPassword() {
    this.router.navigate(['user/Forgot']);
  }

}

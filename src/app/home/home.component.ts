import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  gotoMenu(menu: string): void {
    this.router.navigate([menu]);
  }

  signIn() {
    this.router.navigate(['/user', 'Signin']);
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  resetPassword(){
    this.router.navigate(['user/Forgot']);
  }

}

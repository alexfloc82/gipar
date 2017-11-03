import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { MessageService } from '../message/message.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  userProfile: Observable<any>;
  user: Observable<firebase.User>;
  users: FirebaseObjectObservable<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private messageService: MessageService) {
    this.user = firebaseAuth.authState;
    this.userProfile = new Observable(observer => observer.next(''))
    this.getProfile();
    this.users = db.object('/users');
  }

  signup(email: string, password: string, name: string, lastname: string, adsuser: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        let newUser={};
        let user = { email: email, uid: value.uid, name: name, lastname: lastname, adsuser: adsuser, role: 'Standard' };
        newUser[value.uid]=user;
        this.users.update(newUser).then(a=>
        {
          this.firebaseAuth.auth.currentUser.sendEmailVerification().then(a=>{
            this.messageService.sendMessage('Your account has not been verified yet. Please check your email, activate your account and then log in', 'error');
            this.logout();
          })
        })
      })
      .catch(err => this.messageService.sendMessage(err.message, 'error'))
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(a => {
        if(this.firebaseAuth.auth.currentUser.emailVerified){
          this.getProfile();
        }
        else{
          this.messageService.sendMessage('Your account has not been verified.', 'error');
          this.firebaseAuth.auth.currentUser.sendEmailVerification().then(a=> this.messageService.sendMessage('A verification email has been sent.', 'info'));
          this.logout();
        }
                  
      })
      .catch(err =>
        this.messageService.sendMessage(err.message, 'error')
      );
  }

  changeEmail(email: string, password: string, newEmail: string){
    this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(a=> {
      this.firebaseAuth.auth.currentUser.updateEmail(newEmail)
      .then(a => {
        this.messageService.sendMessage('Your email has been changed', 'info');
        this.firebaseAuth.auth.currentUser.sendEmailVerification().then(a=> this.messageService.sendMessage('A verification email has been sent.', 'info'));
        this.logout();
      })
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(a => this.router.navigate(['/Home']));
  }

  getProfile() {
    this.user.subscribe(userAuth => {
      this.db.list('/users', {
        query: {
          orderByChild: 'uid',
          equalTo: userAuth.uid
        }
      }
      ).subscribe(userProfile => {
        this.userProfile = new Observable(observer => observer.next(userProfile[0]));
      });
    });
  }

  sendResetPassword(email: string) {
    this.firebaseAuth.auth.sendPasswordResetEmail(email)
      .then(a => this.messageService.sendMessage('Un email a sido enviado a ' + email + ' para resetear su contraseña.', 'info'))
      .catch(err =>
        this.messageService.sendMessage(err.message, 'error')
      );
  }

  resetPass(newPass: string, code?: string) {

    if (code) {
      this.firebaseAuth.auth.confirmPasswordReset(code, newPass)
        .then(a => {
          this.messageService.sendMessage('Su contraseña ha sido reseteada correctamente', 'info');
          this.router.navigate(['/Home']);
        })
        .catch(err =>
          this.messageService.sendMessage(err.message, 'error')
        );

    }
    else {
      this.firebaseAuth.auth.currentUser.updatePassword(newPass)
        .then(a => {
          this.messageService.sendMessage('Su contraseña ha sido actualizada', 'info');
          this.router.navigate(['/Home']);
        })
        .catch(err =>
          this.messageService.sendMessage(err.message, 'error')
        );
    }

  }

  getEmail(code: string) {
    this.firebaseAuth.auth.verifyPasswordResetCode(code)
      .then(a => {
        this.messageService.sendMessage('Su contraseña ha sido actualizada', 'info');
      })
      .catch(err => {
        this.messageService.sendMessage(err.message, 'error');
      }
      );
  }

}

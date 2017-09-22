import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { MessageService } from '../message/message.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  userProfile: Observable<any>;
  user: Observable<firebase.User>;
  users: FirebaseListObservable<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private messageService: MessageService) {
    this.user = firebaseAuth.authState;
    this.userProfile = new Observable(observer => observer.next(''))
    this.getProfile();
    this.users = db.list('/users');
  }

  signup(email: string, password: string, name: string, lastname: string, adsuser: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        var user = { email: email, uid: value.uid, name: name, lastname: lastname, adsuser: adsuser, role: 'Standard' };
        this.users.push(user).then(a => this.router.navigate(['/Home']))
      })
      .catch(err => this.messageService.sendMessage(err.message, 'error'))
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(a => this.getProfile())
      .catch(err =>
        this.messageService.sendMessage(err.message, 'error')
      );
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  getProfile(){
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

}

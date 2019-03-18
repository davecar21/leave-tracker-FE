import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { TokenService } from './token.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') || ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService
  ) {

  }

  isAuth() {
    if (localStorage.getItem('token') && this.token.decodeJWT(localStorage.getItem('token'))) {
      console.log('auth true');
      console.log('TOKEN', this.token.decodeJWT(localStorage.getItem('token')));
      return true;
    }
    console.log('auth false');
    return false;
  }

}

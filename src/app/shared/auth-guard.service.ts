import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  apiURL = 'http://localhost:3000';

  isValid;

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService
  ) {
    console.log('TOKEN', this.token.decodeJWT(localStorage.getItem('token')))
    if (localStorage.getItem('token') && this.token.decodeJWT(localStorage.getItem('token'))) {
      this.http.get(this.apiURL, httpOptions).subscribe(
        result => {
          this.router.navigate(['/leave-form']);
          console.log('res', result)
          return true;
        },
        error => {
          console.warn('Auth Failed!', error);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return false;
        }
      )
    } else {
      console.warn('Auth Failed!');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  isAuth() {
    return true
  }



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
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
    private router: Router
  ) {
    console.log('TOKEN', this.getToken(localStorage.getItem('token')))
    http.get(this.apiURL, httpOptions).subscribe(
      result => {
        this.router.navigate(['/leave']);
        console.log('res', result)
        return true;
      },
      error => {
        console.log('error', error)
        this.router.navigate(['/login']);
        return false;
      }
    )
  }

  isAuth() {
    return true;
  }


  getToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}

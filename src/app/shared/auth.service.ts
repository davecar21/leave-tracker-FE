import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loginURL = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(data) {
    return this.http.post(this.loginURL, data, httpOptions);
  }
}

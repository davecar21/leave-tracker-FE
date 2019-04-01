import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from "@ENV";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loginURL = ENV.apiLink+'/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(data) {
    return this.http.post(this.loginURL, data);
  }
}

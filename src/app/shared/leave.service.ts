import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  leaveURL = 'http://localhost:3000/leave';

  constructor(
    private http: HttpClient
  ) { }

  getLeave() {
    return this.http.get(this.leaveURL);
  }

  postLeave(data) {
    return this.http.post(this.leaveURL, data, httpOptions);
  }
}

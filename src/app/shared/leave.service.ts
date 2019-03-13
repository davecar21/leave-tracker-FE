import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  leaveURL = 'http://localhost:3000/leave';

  constructor(
    private http: HttpClient
  ) { }

  getLeave(){
    return this.http.get(this.leaveURL);
  }
}

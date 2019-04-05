import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '@ENV';
import { TokenService } from '@AUTH/token.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  leaveURL = ENV.apiLink + '/leave';

  token = this.tokenService.decodeJWT(localStorage.getItem('token'));

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getLeave() {
    return this.http.get<any>(this.leaveURL).pipe(
      map((data, i) => {
        data.forEach(x => {
          x.leaveDate = new Date(x.leaveDate);
          x.createdAt = new Date(x.createdAt);
          x.leaveDateReturnWork = new Date(x.leaveDateReturnWork);
        });
        return data;
      })
    );
  }

  postLeave(data) {
    console.log('submitLeave', data);
    return this.http.post(this.leaveURL, data);
  }
}

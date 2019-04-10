import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private tokenService: TokenService) { }

  isAuth() {
    if (this.checkToken() &&
    this.tokenService.decodeJWT(this.tokenService.getToken()).userType == 'teamMember') {
      console.log('auth true', this.tokenService.decodeJWT(this.tokenService.getToken()));
      return true;
    }
    console.log('auth false');
    return false;
  }

  isAdmin() {
    if (this.checkToken() &&
      this.tokenService.decodeJWT(this.tokenService.getToken()).userType == 'teamLead') {
      console.log('auth true', this.tokenService.decodeJWT(this.tokenService.getToken()));
      return true;
    }
    console.log('auth false');
    return false;
  }

  checkToken() {
    if (localStorage.getItem('token')
      && this.tokenService.decodeJWT(this.tokenService.getToken())) {
      return true;
    } else {
      return false;
    }
  }
}

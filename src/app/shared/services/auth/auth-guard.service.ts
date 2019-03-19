import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private token: TokenService
  ) {

  }

  isAuth() {
    if (localStorage.getItem('token') && this.token.decodeJWT(localStorage.getItem('token'))) {
      console.log('auth true', 'TOKEN', this.token.decodeJWT(localStorage.getItem('token')));
      return true;
    }
    console.log('auth false');
    return false;
  }

}

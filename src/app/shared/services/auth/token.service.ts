import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  decodeJWT(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.log('jwt-decode ERROR:', error);
      return null;
    }
  }

}

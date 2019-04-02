import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService {
  constructor(private token: TokenService) { }

  isAuth() {
    if (localStorage.getItem("token") && this.token.decodeJWT(this.token.getToken())) {
      if (Date.now() / 1000 > this.token.decodeJWT(this.token.getToken()).exp) {
        console.log("Auth Failed! Token is Expired!");
        return false;
      }
      console.log("auth true", this.token.decodeJWT(this.token.getToken()));
      return true;
    }
    console.log("auth false");
    return false;
  }
}

import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { TokenService } from "@AUTH/token.service";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {

  token = this.tokenService.decodeJWT(localStorage.getItem("token"));

  header = {
    setHeaders: {
      "Content-Type": "application/json"
    }
  };

  bodyData = {
    body: {
    }
  }
  

  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      this.header.setHeaders["Authorization"] = localStorage.getItem("token");
      this.bodyData.body["userID"] = this.token.userID;
    } else {
      delete this.header.setHeaders["Authorization"];
    }

    request = request.clone(this.header);
    

    return next.handle(request);
  }
}

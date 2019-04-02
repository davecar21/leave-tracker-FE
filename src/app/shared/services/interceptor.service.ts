import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { TokenService } from "@AUTH/token.service";

import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

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

  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set("Content-Type", "application/json")
    });

    request = request.clone({
      headers: request.headers.set(
        "Authorization",
        this.tokenService.getToken() || ""
      )
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("HttpResponse status", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error.message)
        return throwError(error);
      })
    );
  }
}

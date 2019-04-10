import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { TokenService } from '@AUTH/token.service';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token = this.tokenService.decodeJWT(localStorage.getItem('token'));

  header = {
    setHeaders: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private tokenService: TokenService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    });

    request = request.clone({
      headers: request.headers.set(
        'Authorization',
        this.tokenService.getToken() || ''
      )
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('HttpResponse status', event);
        }

        if (this.tokenService.getToken() != null) {
          if (Date.now() / 1000 > this.tokenService.decodeJWT(this.tokenService.getToken()).exp) {
            localStorage.removeItem('token');
            console.log('Auth Failed! Token is Expired!');
          } else {
            console.log('tokentime', Date.now() / 1000, this.tokenService.decodeJWT(this.tokenService.getToken()).exp)
          }
        }


        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          localStorage.removeItem('token');
          console.warn('Unauthorized!');
        }
        console.error(error);
        return throwError(error);
      })
    );
  }
}

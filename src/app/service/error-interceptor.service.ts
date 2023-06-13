import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private cookieService: CookieService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.msg === 'Token has expired') {

          console.log(error.message)
          // Handle the expired token error here
          // For example, you can redirect to a login page or display an error message
          console.log('ExpiredSignatureError occurred');

          this.cookieService.delete('Token');
          // document.cookie = 'Token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
          this.router.navigate(['/login']);
          // Perform the desired action for handling the expired token error

          // Optionally, rethrow the error to propagate it further
          return throwError(error);
        }
        // Rethrow the error for other error types
        return throwError(error);
      })
    );
  }
}

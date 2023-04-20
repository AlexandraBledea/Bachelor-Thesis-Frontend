import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {parseJwt} from "../utils/JWTParser";
import {parse} from "url";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Headers are set");


    if (!request.url.includes("/login") && !request.url.includes("/register")) {
      const jwt = this.cookieService.get("Token");

      const payload = parseJwt(jwt)

      const datetime = payload.expiration
      console.log(datetime)
      // const date = parse(datetime, 'MM-dd-yyyy hh:mm:ss', new Date())
      // console.log(date)
      //
      // if(Date.now() > date){
      //
      // }

      // console.log(request.url)
      const headers: any = {"token": jwt};
      request = request.clone({setHeaders: headers});
    }
    return next.handle(request);
  }
}

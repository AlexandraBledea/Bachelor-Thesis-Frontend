import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {parseJwt} from "../utils/JWTParser";

@Injectable({
  providedIn: 'root'
})
export class AuthguardLoginService  implements CanActivate {
  constructor(private cookieService: CookieService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get("Token")

    // const jwt = parseJwt(token)
    // const expirationString = jwt.expiration;
    // const expirationDate = new Date(expirationString.replace(' ', 'T') + 'Z');
    //
    //
    //
    // console.log(tokenExpirationDate)
    // console.log(expirationDate);
    // console.log(jwt.expiration)
    // console.log(token)
    if(token === "undefined" || token == '') {
      return true;
    }else{
      this.router.navigate(["../home"]);
    }
    return false;
  }
}

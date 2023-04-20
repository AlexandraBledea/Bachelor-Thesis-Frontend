import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthguardService implements CanActivate{

  constructor(private cookieService: CookieService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get("Token");

    if(token === "undefined"  || token == ''){
      this.router.navigate(["../login"])
      return false;
    }
    return true;
  }
}

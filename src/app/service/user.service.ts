import { Injectable } from '@angular/core';
import {parseJwt} from "../utils/JWTParser";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {Observable} from "rxjs";
import {UserRegisterData} from "../shared/data-type/UserRegisterData";

const URL_BASE = "http://127.0.0.1:5000/user"

const LOGIN = "http://127.0.0.1:5000/login"
const REGISTER = "http://127.0.0.1:5000/register"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  public login(loginData: UserLoginData): Observable<any>{
    return this.httpClient.post<any>(LOGIN,loginData);
  }

  public register(registerData: UserRegisterData): Observable<any>{
    return this.httpClient.post<any>(REGISTER,registerData);
  }

}

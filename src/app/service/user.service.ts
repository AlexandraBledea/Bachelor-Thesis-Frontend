import { Injectable } from '@angular/core';
import {parseJwt} from "../utils/JWTParser";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {Observable} from "rxjs";
import {UserRegisterData} from "../shared/data-type/UserRegisterData";
import {UserChangePasswordData} from "../shared/data-type/UserChangePasswordData";

const URL_BASE = "http://127.0.0.1:5000/"

const LOGIN = URL_BASE + "login"
const REGISTER = URL_BASE + "register"
const CHANGE_PASSWORD = URL_BASE + "login/change-password"



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  public login(loginData: UserLoginData): Observable<any>{
    return this.httpClient.post<any>(LOGIN,loginData);
  }
  public register(registerData: UserRegisterData): Observable<any> {
    return this.httpClient.post<any>(REGISTER, registerData);
  }
  public changePassword(newData: UserChangePasswordData): Observable<any>{
    return this.httpClient.put(CHANGE_PASSWORD, newData, {responseType: 'json'});
  }





}

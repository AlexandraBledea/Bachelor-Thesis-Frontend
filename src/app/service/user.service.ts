import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLoginData} from "../shared/data-type/UserLoginData";
import {Observable} from "rxjs";
import {UserRegisterData} from "../shared/data-type/UserRegisterData";
import {UserChangePasswordData} from "../shared/data-type/UserChangePasswordData";
import {Recording} from "../shared/data-type/Recording";

const URL_BASE = "http://127.0.0.1:5000/"


const LOGIN = URL_BASE + "login"
const REGISTER = URL_BASE + "register"
const CHANGE_PASSWORD = URL_BASE + "login/change-password"
const GET_PREDICTION_EXPERT_USER = URL_BASE + "get-prediction-expert-user"
const GET_PREDICTION_SIMPLE_USER = URL_BASE + "get-prediction-simple-user"
const GET_RECORDINGS = URL_BASE + "recordings"



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(loginData: UserLoginData): Observable<any>{
    return this.httpClient.post<any>(LOGIN,loginData);
  }

  public register(registerData: UserRegisterData): Observable<any> {

    return this.httpClient.post<any>(REGISTER, registerData);
  }

  public changePassword(newData: UserChangePasswordData): Observable<any>{
    return this.httpClient.put(CHANGE_PASSWORD, newData, {responseType: 'json'});
  }

  public sendRecordingExpertUser(recording: Recording): Observable<any>{
    return this.httpClient.post<any>(GET_PREDICTION_EXPERT_USER, recording);
  }

  public sendRecordingSimpleUser(recording: Recording): Observable<any>{
    return this.httpClient.post<any>(GET_PREDICTION_SIMPLE_USER, recording);
  }

  public getPredictedRecordings(): Observable<Recording[]>
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<Recording[]>(GET_RECORDINGS, httpOptions)

  }

}

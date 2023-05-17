import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Recording} from "../shared/data-type/Recording";



const URL_BASE = "http://127.0.0.1:5000/"
const GET_RECORDINGS = "http://127.0.0.1:5000/recordings"


@Injectable({
  providedIn: 'root'
})

export class PredictionsService {



  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }


  public getPredictedRecordings(email: String): Observable<Recording[]>
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = `${GET_RECORDINGS}?email=${email}`

    let  result = this.httpClient.get<Recording[]>(GET_RECORDINGS, httpOptions)
    console.log(result)
    return result
  }

}


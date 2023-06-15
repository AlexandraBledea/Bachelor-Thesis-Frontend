import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SllValidationInterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: { 'X-Skip-SSL-Validation': 'true' } });
    return next.handle(request);
  }
}

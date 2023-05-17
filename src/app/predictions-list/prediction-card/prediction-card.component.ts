import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Recording} from "../../shared/data-type/Recording";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserService} from "../../service/user.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-prediction-card',
  templateUrl: './prediction-card.component.html',
  styleUrls: ['./prediction-card.component.scss']
})


export class PredictionCardComponent {

  @Input() recording?: Recording;
  @Input() index?: number;
  @Output() customEvent = new EventEmitter<Recording>();

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void{
    this.checkConnection()
  }

  displayDetails(recording: any){
    this.checkConnection()
    this.customEvent.emit(recording);
  }

  checkConnection(){
    this.userService.checkConnection().pipe(catchError(error => {
        if (error.status === 401) {
          // Handle the UNAUTHORIZED error here
          // For example, you can redirect to a login page or display an error message
          console.log('UNAUTHORIZED error occurred');

          this.cookieService.delete('Token');
          // document.cookie = 'Token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
          this.router.navigate(['/login']);
        }

        // Rethrow the error to propagate it to the subscriber
        return throwError(error);
      })
    ).subscribe(result => {
      return;
    })
  }

}

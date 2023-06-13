import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(private cookieService: CookieService, private router: Router) {
  }

  simpleUser() {
    this.router.navigate(['../simple-user']);
  }

  logoutUser() {
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
    localStorage.removeItem('recordings')
  }

  expertUser() {
    this.router.navigate(['../expert-user'])
  }

  home() {
    this.router.navigate(['../home'])
  }
}

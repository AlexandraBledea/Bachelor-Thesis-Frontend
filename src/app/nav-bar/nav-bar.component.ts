import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(private cookieService: CookieService, private router: Router, private renderer: Renderer2, private el: ElementRef) {
  }

  simpleUser() {
    let simpleUserElement = document.getElementById('simple-user') as HTMLElement;
    let expertUserElement = document.getElementById('expert-user') as HTMLElement;
    simpleUserElement.className = 'active';
    expertUserElement.className = '';

  }

  logoutUser() {
    this.cookieService.delete('Token');
    // document.cookie = 'Token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }

  expertUser() {
    let simpleUserElement = document.getElementById('simple-user') as HTMLElement;
    let expertUserElement = document.getElementById('expert-user') as HTMLElement;
    simpleUserElement.className = '';
    expertUserElement.className = 'active';
    this.router.navigate(['/expert-user']);
  }
}

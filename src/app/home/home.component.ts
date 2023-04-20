import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private userService : UserService, private router: Router, private cookieService: CookieService) { }

  logout() {
    this.cookieService.delete('Token');
    // document.cookie = 'Token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.cookieService.delete('Token');
  }
}

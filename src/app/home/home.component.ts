import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  isAudioRecording = false;
  audioRecordedTime: any;
  audioBlobUrl: any;
  audioBlob: any;
  audioName = "";

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {
  }

  logout() {
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

  simpleUser() {
    this.router.navigate(["../simple-user"])
  }

  expertUser() {
    this.router.navigate(["../expert-user"])
  }

}



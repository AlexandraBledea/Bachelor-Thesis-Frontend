import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../service/user.service";
import {Router, Routes} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AudioRecordingService} from 'app/service/audio-recording.service';
import {Recording} from "../shared/data-type/Recording";

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
    private userService: UserService
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



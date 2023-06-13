import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AudioRecordingService} from "../service/audio-recording.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {Recording} from "../shared/data-type/Recording";
import {PredictionsListComponent} from "../predictions-list/predictions-list.component";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {parseJwt} from "../utils/JWTParser";

@Component({
  selector: 'app-simple-user',
  templateUrl: './simple-user.component.html',
  styleUrls: ['./simple-user.component.scss']
})
export class SimpleUserComponent implements OnInit, OnDestroy{
  isAudioRecording = false;
  audioRecordedTime: any;
  audioBlobUrl: any;
  audioBlob: any;
  audioName = "";
  isRecorded = false;
  selectedEmotion: any;
  emotions: string[] = ['Anger', 'Happiness', 'Sadness', 'Fear', 'Surprised', 'Disgust']
  alreadyPredicted = false;
  @ViewChild('predictionsList') predictionsList!: PredictionsListComponent;
  showErrorMessage = false;
  showPredictionMadeSuccessfully = false;
  showPredictionAlreadyMade = false;
  predictedEmotion = '';
  base64Image = '';
  image: any;
  chartOptions: any;
  usedModel = '';

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private router: Router,
    private userService: UserService
  ) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioBlob = data.blob;
      this.audioName = data.title;
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

  logout() {
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
      this.isRecorded = false;
      this.alreadyPredicted = false;
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
      this.isRecorded = true;
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
    this.isRecorded = false;
    this.alreadyPredicted = false;
    this.showPredictionAlreadyMade = false;
    this.showPredictionMadeSuccessfully = false;
  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/wav', this.audioName);
  }

  sendRecording(){

    if (this.alreadyPredicted) {

      this.showPredictionAlreadyMade = true;
      setTimeout(() => {
        this.showPredictionAlreadyMade = false;
      }, 5000);
      return;
    }

    if (this.selectedEmotion == null) {
      this.showErrorMessage = true;
      return;
    }

    let token = this.cookieService.get('Token')
    let email = parseJwt(token).sub


    this.audioBlob.arrayBuffer().then((buff: Iterable<number>) => {
      let x = new Uint8Array(buff);
      const recodingData: Recording = {
        userEmail: email,
        actualEmotion: this.selectedEmotion,
        audio: Array.from(x)
      }
      this.userService.sendRecordingSimpleUser(recodingData).subscribe(result => {
        this.predictionsList.addPredictionRecording(result)

        this.alreadyPredicted = true;
        this.showPredictionMadeSuccessfully = true;

        setTimeout(() => {
          this.showPredictionMadeSuccessfully = false;
        }, 5000);

        this.predictedEmotion = result.predictedEmotion
        this.usedModel = result.model

      })
    });
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }


  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  resetWarnings() {
    this.showErrorMessage = false;
  }
}

import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AudioRecordingService} from "../service/audio-recording.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {Recording} from "../shared/data-type/Recording";
import {parseJwt} from "../utils/JWTParser";
import {PredictionsListComponent} from "../predictions-list/predictions-list.component";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";



@Component({
  selector: 'app-expert-user',
  templateUrl: './expert-user.component.html',
  styleUrls: ['./expert-user.component.scss']
})

export class ExpertUserComponent implements OnInit, OnDestroy {
  isAudioRecording = false;
  audioRecordedTime: any;
  audioBlobUrl: any;
  audioBlob: any;
  audioName = "";
  isRecorded = false;
  selectedEmotion: any;
  selectedModel: any;
  models: string[] = ['English Ravdess', 'English Tess']
  emotions: string[] = ['Anger', 'Happiness', 'Sadness', 'Fear', 'Surprised', 'Disgusted']
  alreadyPredicted = false;
  usedModels: string[] = []

  @ViewChild('predictionsList') predictionsList!: PredictionsListComponent;
  showErrorMessage = false;
  showPredictionMadeSuccessfully = false;
  showPredictionAlreadyMade = false;
  predictedEmotion = '';
  base64Image = '';
  image: any;
  chartOptions: any;


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
    this.checkConnection()
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
      this.usedModels = []
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
      this.isRecorded = true;
      this.usedModels = []

    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
    this.isRecorded = false;
    this.alreadyPredicted = false;
    this.showPredictionAlreadyMade = false;
    this.showPredictionMadeSuccessfully = false;
    this.usedModels = []

  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/wav', this.audioName);
  }

  sendRecording() {

    this.checkConnection()

    if (this.selectedEmotion == null || this.selectedModel == null) {
      this.showErrorMessage = true;
      return;
    }

    if(this.checkAlreadyPredicted(this.selectedModel)) {
      return;
    }

    let token = this.cookieService.get('Token')
    let email = parseJwt(token).sub



    this.audioBlob.arrayBuffer().then((buff: Iterable<number>) => {
      let x = new Uint8Array(buff);
      const recodingData: Recording = {
        userEmail: email,
        actualEmotion: this.selectedEmotion,
        audio: Array.from(x),
        model: this.selectedModel
      }

      this.usedModels.push(this.selectedModel)

      this.userService.sendRecordingExpertUser(recodingData).pipe(catchError(error => {
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

        this.predictionsList.addPredictionRecording(result)

        this.alreadyPredicted = true;
        this.showPredictionMadeSuccessfully = true;

        setTimeout(() => {
          this.showPredictionMadeSuccessfully = false;
        }, 5000);

        this.predictedEmotion = result.predictedEmotion

        this.createChart(Object.keys(result.statistics), Object.values(result.statistics))

      })
    });

  }

  checkAlreadyPredicted(selectedModel: string){
    let i;
    for (i = 0; i < this.usedModels.length; i++) {
      if (this.usedModels[i] == selectedModel) {

        this.showPredictionAlreadyMade = true;
        setTimeout(() => {
          this.showPredictionAlreadyMade = false;
        }, 5000);

        return true;
      }
    }
    return false;
  }

  createChart(labels: string[], percentages: number[]){
    this.chartOptions = {
      series: [
        {
          name: "Emotion",
          data: percentages
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        background: "#F5F5F5"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom,
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: string) {
          return val + "%";
        },
        offsetY: 10,
        style: {
          fontSize: "12px",
          colors: ["#444444"]
        }
      },

      xaxis: {
        categories: labels,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
       crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: false,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: ["#DAB8F3"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        },
        colors: ["#D89CF6"]
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val: string) {
            return val + "%";
          }
        },
        style: {
          paddingTop: "10px"
        }
      },
      title: {
        text: "Emotion Recongition probabilities",
        floating: 0,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  checkConnection() {
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


  convertToImage(statistics: number[]) {
    const bytes = new Uint8Array(statistics);

    let binary_string = '';
    for (let i = 0; i < bytes.length; i++) {
      binary_string += String.fromCharCode(bytes[i]);
    }

    let blob = new Blob([bytes], {type: 'image/png'});
    this.base64Image = URL.createObjectURL(blob);
  }


  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], {type: type});
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

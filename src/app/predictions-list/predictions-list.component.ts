import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Recording} from "../shared/data-type/Recording";
import {PredictionsService} from "../service/predictions.service";
import {parseJwt} from "../utils/JWTParser";
import {MatTableDataSource} from "@angular/material/table";
import {CookieService} from "ngx-cookie-service";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
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
  selector: 'app-predictions-list',
  templateUrl: './predictions-list.component.html',
  styleUrls: ['./predictions-list.component.scss']
})
export class PredictionsListComponent implements OnInit{
  recordings: Recording[] = []
  index = 0;
  audioUrl = '';
  imageUrl = '';
  isClicked = false;
  number = 0;
  chartOptions: any;


constructor(private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private predictionService: PredictionsService, private cookieService: CookieService, private router: Router) {
  }


  ngOnInit(): void{
    this.getPredictedRecordings()
    this.checkConnection()
  }

  getPredictedRecordings() {
    this.checkConnection()

    let token = this.cookieService.get('Token')
    let email = parseJwt(token).sub

    this.predictionService.getPredictedRecordings(email).pipe(
      catchError(error => {
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
    ).subscribe(data => {
      this.recordings = data;
    })
  }

  addPredictionRecording(recording: Recording){
    this.recordings!.push(recording)
    this.changeDetectorRef.detectChanges();
  }

  onCustomEvent(data: Recording) {
    this.checkConnection()
    // this.convertToImage(data.statistics!)
    this.createChart(Object.keys(data.statistics!), Object.values(data.statistics!))
    this.convertToAudio(data.audio!)
    this.isClicked = true;
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


  convertToImage(statistics: number[]) {
    const bytes = new Uint8Array(statistics);
    let blob = new Blob([bytes], {type: 'image/png'});
    this.imageUrl = URL.createObjectURL(blob);
  }

  convertToAudio(audio: number[]){
    const bytes = new Uint8Array(audio);
    const blob = new Blob([bytes], { type: 'audio/wav' });
    this.audioUrl = URL.createObjectURL(blob);
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

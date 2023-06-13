import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Recording} from "../shared/data-type/Recording";
import {UserService} from "../service/user.service";


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
  exists = false;


constructor(private userService: UserService, private changeDetectorRef: ChangeDetectorRef) {
  }


  ngOnInit(): void{
    this.getPredictedRecordings()
  }

  getPredictedRecordings() {
    this.userService.getPredictedRecordings().subscribe(data => {
      this.recordings = data;
    })
  }

  addPredictionRecording(recording: Recording){
    this.recordings!.push(recording)
    this.changeDetectorRef.detectChanges();
  }

  onCustomEvent(data: Recording) {
    console.log(data.statistics!)
    if(Array.isArray(data.statistics) && data.statistics.length === 0) {
      this.exists = false
      this.convertToAudio(data.audio!)
      this.isClicked = true
      return;
    }
    this.createChart(Object.keys(data.statistics!), Object.values(data.statistics!))
    this.convertToAudio(data.audio!)
    this.isClicked = true
    this.exists = true
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

  convertToAudio(audio: number[]){
    const bytes = new Uint8Array(audio);
    const blob = new Blob([bytes], { type: 'audio/wav' });
    this.audioUrl = URL.createObjectURL(blob);
  }


}

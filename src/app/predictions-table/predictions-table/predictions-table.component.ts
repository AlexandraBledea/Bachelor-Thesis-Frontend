import {AfterViewInit, Component, OnChanges, ViewChild} from '@angular/core';
import {Recording} from "../../shared/data-type/Recording";
import {PredictionsService} from "../../service/predictions.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CookieService} from "ngx-cookie-service";
import {parseJwt} from "../../utils/JWTParser";

const ELEMENT_DATA: Recording[] = []

@Component({
  selector: 'app-predictions-table',
  templateUrl: './predictions-table.component.html',
  styleUrls: ['./predictions-table.component.scss']
})
export class PredictionsTableComponent implements AfterViewInit, OnChanges{
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['No.', 'Model', 'Actual Emotion', 'Predicted Emotion', 'See more']

  detailsPressed = false;
  audioBlobUrl: any;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private predictionService: PredictionsService, private cookieService: CookieService) {

  }

  displayDetails(element: Recording) {

  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.getPredictedRecordings()
  }

  ngOnChanges() {
    // this.getPredictedRecordings()
  }

  addPredictionRecording(recording: Recording){
    this.dataSource.data.push(recording)
    this.dataSource._updateChangeSubscription(); // Notify the table about the changes

  }

  getPredictedRecordings(){
    console.log("pulka")
    let token = this.cookieService.get('Token')
    let email = parseJwt(token).sub


    this.predictionService.getPredictedRecordings(email).subscribe(data => {
      this.dataSource = new MatTableDataSource<Recording>(data);
      this.dataSource.paginator = this.paginator;
    })


  }

}

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Recording} from "../../shared/data-type/Recording";


@Component({
  selector: 'app-prediction-card',
  templateUrl: './prediction-card.component.html',
  styleUrls: ['./prediction-card.component.scss']
})


export class PredictionCardComponent {

  @Input() recording?: Recording;
  @Input() index?: number;
  @Output() customEvent = new EventEmitter<Recording>();

  constructor() {
  }

  ngOnInit(): void{
  }

  displayDetails(recording: any){
    this.customEvent.emit(recording);
  }


}

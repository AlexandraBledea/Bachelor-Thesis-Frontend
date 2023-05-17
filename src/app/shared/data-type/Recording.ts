export class Recording {

  userEmail?:string;
  actualEmotion?:string;
  predictedEmotion?:string;
  audio?: number[];
  model?:string;
  statistics?: Map<string, number>
}


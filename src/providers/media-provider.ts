import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Media } from "../models/media";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaProvider {

  constructor() {
    console.log('Hello MediaProvider Provider');
  }

  all() {
    return [
      new Media("pict 1", "/assets/images/ionic2-logo.png", 10),
      new Media("video ", "/assets/images/ionic2-logo.png", undefined)
    ]
  }


  add(media: Media) {
    console.log("TODO media provider add")
  }


  changeDuration(mediaId, duration) {
    console.log("TODO change duration")
  }

}

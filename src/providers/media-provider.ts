import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Media } from "../models/media";

@Injectable()
export class MediaProvider {

  medias: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.medias = af.database.list('/medias');
  }

  all(): FirebaseListObservable<any> {
    return this.medias
  }

  add(media: Media) {
    this.medias.push(media);
  }

  delete(id: string) {
    this.medias.remove(id);
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Injectable()
export class MediaProvider {

  medias: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.medias = af.database.list('/medias');
  }

  all(): FirebaseListObservable<any> {
    return this.medias
  }

  add(media) {
    this.medias.push(media);
  }

  delete(id) {
    this.medias.remove(id);
  }

}

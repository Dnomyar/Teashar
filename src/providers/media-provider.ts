import { Media } from "../models/media";
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import { reorderArray } from "ionic-angular";
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class MediaProvider {

  private medias: FirebaseListObservable<any[]>

  constructor(private af: AngularFire, private storyId: string) {
    this.medias = af.database.list(`/stories/${storyId}/medias`, {
      query: {
        orderByChild: 'order'
      }
    });
  }

  all(): FirebaseListObservable<Media[]> {
    return this.medias;
  }

  // all() {
  //   return [
  //     new Media("pict 1", "/assets/images/ionic2-logo.png", 10),
  //     new Media("video ", "/assets/images/ionic2-logo.png", undefined)
  //   ]
  // }


  add(media: Media) {
    this.medias.push(media)
  }


  changeDuration(mediaId, duration) {
    this.medias.update(mediaId, {
      durationInSecs: duration
    })
  }


  reorderItems(indexes) {
    var isReordered = false

    const updateOrder = (media, idx) => {
      this.medias.update(media.$key, {
        order: idx
      })
    }

    this.medias
      .filter(_ => !isReordered)
      .map(medias => {
        reorderArray(medias, indexes).map(updateOrder)
        isReordered = true
      })
      .subscribe(_ => console.log("reorderItems ok"))
  }




}

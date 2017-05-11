import { Injectable } from '@angular/core';
import { MediaProvider } from "./media-provider";
import { AngularFire } from "angularfire2";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaProviderFactory {

  constructor(private af: AngularFire) {
  }

  create(storyId: string): MediaProvider {
    return new MediaProvider(this.af, storyId)
  }

}

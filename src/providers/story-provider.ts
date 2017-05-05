import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Story } from "../models/story";

@Injectable()
export class StoryProvider {

  stories: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.stories = af.database.list('/stories');
  }

  all(): FirebaseListObservable<Story> {
    return this.stories
  }

  add(story: Story) {
    this.stories.push(story);
  }

  delete(id: string) {
    this.stories.remove(id);
  }

}

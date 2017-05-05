import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { MediaListItemOptions } from "../../media/media-list/media-list-item-options";
import { StoryProvider } from "../../providers/story-provider";

/**
 * Generated class for the Student page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class Student {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storyProvider: StoryProvider,
    private mediaListItemOptions: MediaListItemOptions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Student');
  }


}

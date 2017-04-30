import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { MediaListItemOptions } from "../../media/media-list/media-list-item-options";

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

  medias: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    af: AngularFire,
    private mediaListItemOptions: MediaListItemOptions) {
    this.medias = af.database.list('/medias');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Student');
  }


  showOptions(songId: string, songTitle: string) {
    this.mediaListItemOptions.showOptions(this.medias, songId, songTitle)
  }

}

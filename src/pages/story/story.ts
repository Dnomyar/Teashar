import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { MediaProvider } from "../../providers/media-provider";

/**
 * Generated class for the Story page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class Story {
  
  private story: string
  private medias: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private mediaProvider: MediaProvider) {
      this.medias = this.mediaProvider.all()
    this.story = navParams.get("story")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Story');
  }

  reorderItems(indexes) {
    this.medias = reorderArray(this.medias, indexes);
  }

}

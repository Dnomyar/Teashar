import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';
import { Gallery } from "../../media/file-system/gallery/gallery.impl";
import { Upload } from "../../media/upload/upload.impl";
import { UploadLoader } from "./upload-loader";
import { MediaListItemOptions } from "../../media/media-list/media-list-item-options";
import { StoryProvider } from "../../providers/story-provider";
import { Story } from "../../models/story";
import { Story as StoryPage } from "../../pages/story/story";
import { StoryModalAdd } from "../../providers/story-modal-add";


@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class Teacher {

  constructor(public navCtrl: NavController,
    private storyProvider: StoryProvider,
    private mediaListItemOptions: MediaListItemOptions,
    private storyModalAdd: StoryModalAdd) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teacher');
  }

  addStory(): void {
    this.storyModalAdd.show()
      .map(this.createStory)
      .map(this.storeStory)
      .subscribe(e => console.log("Story created"))
  }

  private createStory: (any) => Story = alertInput =>
    new Story(alertInput.title, new Date().toString())

  private storeStory: (Story) => any = story =>
    this.storyProvider.add(story)


  openStory(storyId: string, story: Story) {
    story.id = storyId
    this.navCtrl.push(StoryPage, { story: story })
  }


  showOptions(id: string, title: string) {
    this.mediaListItemOptions.showOptions(id, title)
  }



}

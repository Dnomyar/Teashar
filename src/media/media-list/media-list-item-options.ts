
import { ActionSheetController } from "ionic-angular";
import { FirebaseListObservable } from "angularfire2";
import { Injectable } from "@angular/core";
import { StoryProvider } from "../../providers/story-provider";

@Injectable()
export class MediaListItemOptions {

  constructor(private actionSheetCtrl: ActionSheetController,
    private storyProvider: StoryProvider) {
  }

  showOptions(id: string, title: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: `Delete "${title}"`,
          role: 'destructive',
          handler: () => {
            this.removeMedia(id);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  private removeMedia(id: string) {
    this.storyProvider.delete(id)
  }

}

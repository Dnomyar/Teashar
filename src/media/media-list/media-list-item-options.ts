
import { ActionSheetController } from "ionic-angular";
import { FirebaseListObservable } from "angularfire2";
import { Injectable } from "@angular/core";
import { MediaProvider } from "../../providers/media-provider";

@Injectable()
export class MediaListItemOptions {

  constructor(private actionSheetCtrl: ActionSheetController,
    private mediaProvider: MediaProvider) {
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
    this.mediaProvider.delete(id)
  }

}

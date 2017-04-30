
import { ActionSheetController } from "ionic-angular";
import { FirebaseListObservable } from "angularfire2";
import { Injectable } from "@angular/core";

@Injectable()
export class MediaListItemOptions {

  constructor(private actionSheetCtrl: ActionSheetController) {
  }

  showOptions(medias: FirebaseListObservable<any>, songId: string, songTitle: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: `Delete "${songTitle}"`,
          role: 'destructive',
          handler: () => {
            this.removeMedia(medias, songId);
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

  private removeMedia(medias: FirebaseListObservable<any>, songId: string) {
    medias.remove(songId);
  }

}
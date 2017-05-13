



import { ViewController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";

@Component({
  templateUrl: 'upload-modal.html'
})
export class UploadModal {

  private mediaTitle: string = "";
  private mediaLocalPath: string = "";
  private durationInSecs: string = "10";

  private durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  constructor(public viewCtrl: ViewController, private _navParams: NavParams) {
    this.mediaLocalPath = _navParams.get("mediaLocalPath")
  }

  /*
  I chose to return (dismiss) promises to handle both case (cancel upload and confirm upload)
  */

  upload() {
    this.viewCtrl.dismiss(
      new Promise<any>((resolve, reject) => {
        resolve({
          title: this.mediaTitle,
          durationInSecs: this.durationInSecs
        })
      })
    );
  }

  dismiss() {
    this.viewCtrl.dismiss(
      new Promise<any>((resolve, reject) => {
        reject()
      })
    );
  }

}

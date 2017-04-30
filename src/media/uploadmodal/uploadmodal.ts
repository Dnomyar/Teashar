



import { ViewController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";

@Component({
  templateUrl: 'uploadmodal.html'
})
export class UploadModal {

  private mediaTitle: string = "";
  private mediaLocalPath: string = "";

  constructor(public viewCtrl: ViewController, private _navParams: NavParams) {
    this.mediaLocalPath = _navParams.get("mediaLocalPath")
  }

  /*
  I chose to return (dismiss) promises to handle both case (cancel upload and confirm upload) 
  */

  upload() {
    this.viewCtrl.dismiss(
      new Promise<any>((resolve, reject) => {
        resolve(this.mediaTitle)
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
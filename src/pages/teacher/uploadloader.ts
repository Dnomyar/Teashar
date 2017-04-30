
import { Injectable } from "@angular/core";


import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class UploadLoader {

  private loader: Loading;

  constructor(public loadingCtrl: LoadingController) {

  }

  private getLoadMessage(progress: number): string {
    return `Please wait... (${progress} %)`
  }

  public show() {
    this.loader = this.loadingCtrl.create({
      content: this.getLoadMessage(0)
    });
    this.loader.present();
  }

  public onProgress: (number) => void = (progress: number) => {
    this.loader.setContent(this.getLoadMessage(progress))
  }

  public dismiss(): void {
    this.loader.dismiss();
  }

}
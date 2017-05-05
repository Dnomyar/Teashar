import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';
import { Gallery } from "../../media/file-system/gallery/gallery.impl";
import { Upload } from "../../media/upload/upload.impl";
import { UploadModal } from "../../media/upload-modal/upload-modal";
import { UploadLoader } from "./upload-loader";
import { MediaListItemOptions } from "../../media/media-list/media-list-item-options";
import { StoryProvider } from "../../providers/story-provider";
import { Story } from "../../models/story";


@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class Teacher {

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private storyProvider: StoryProvider,
    @Inject(Gallery) public gallery,
    @Inject(Upload) public upload,
    private uploadLoader: UploadLoader,
    private mediaListItemOptions: MediaListItemOptions,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teacher');
  }

  openGallery(): void {

    this.gallery.load()
      .then((filePath: string) => this.openModal(filePath))
      .catch((err: Error) => {
        // no image selected, do nothing here
      })

  }

  private openModal(filePath: string): void {
    let contactModal = this.modalCtrl.create(UploadModal, { mediaLocalPath: filePath });
    contactModal.present()

    contactModal.onDidDismiss((promise) => {
      promise
        .then((mediaTitle) => this.uploadimage(filePath, mediaTitle))
        .catch((err) => {
          // do nothing here
        })
    })
  }


  private uploadimage(filePath: string, mediaTitle: string) {

    this.uploadLoader.show()

    this.upload.upload(filePath, this.uploadLoader.onProgress)
      .then((res) => {
        this.addMedia(mediaTitle, res.downloadURL)
        this.uploadLoader.dismiss()
      })
      .catch((err) => {
        this.uploadLoader.dismiss()
        this.showError()
      })

  }

  private addMedia(title: string, url: string): void {
    this.storyProvider.add(new Story(title, url))
  }


  private showError(): void {
    let alert = this.alertCtrl.create({
      title: 'An error occured',
      subTitle: "Try again later please",
      buttons: ['OK']
    });
    alert.present();
  }



  showOptions(id: string, title: string) {
    this.mediaListItemOptions.showOptions(id, title)
  }



}

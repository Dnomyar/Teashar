import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, ModalController, AlertController } from 'ionic-angular';
import { MediaProvider } from "../../providers/media-provider";
import { Media } from "../../models/media";
import { Gallery } from "../../media/file-system/gallery/gallery.impl";
import { UploadModal } from "../../media/upload-modal/upload-modal";
import { UploadLoader } from "../teacher/upload-loader";
import { Upload } from "../../media/upload/upload.impl";

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
  private durations: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    @Inject(Gallery) public gallery,
    @Inject(Upload) public upload,
    public alertCtrl: AlertController,
    private uploadLoader: UploadLoader,
    public modalCtrl: ModalController,
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

  changeDuration(event, media) {
    const valueChosen = event.value
    this.mediaProvider.changeDuration(media.key, valueChosen)
  }


  deleteItem() {
    console.log("deleteItem")
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
        .then((data) => this.uploadimage(filePath, data.title, data.durationInSecs))
        .catch((err) => {
          // do nothing here
        })
    })
  }


  private uploadimage(filePath: string, mediaTitle: string, duration: number) {

    this.uploadLoader.show()

    this.upload.upload(filePath, this.uploadLoader.onProgress)
      .then((res) => {
        this.addMedia(mediaTitle, res.downloadURL, duration)
        this.uploadLoader.dismiss()
      })
      .catch((err) => {
        this.uploadLoader.dismiss()
        this.showError()
      })

  }

  private addMedia(title: string, url: string, duration: number): void {
    this.mediaProvider.add(new Media(title, url, duration))
  }


  private showError(): void {
    let alert = this.alertCtrl.create({
      title: 'An error occured',
      subTitle: "Try again later please",
      buttons: ['OK']
    });
    alert.present();
  }




}

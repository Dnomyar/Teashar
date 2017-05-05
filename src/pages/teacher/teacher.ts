import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform, LoadingController, ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
//import { File, Entry } from '@ionic-native/file';
import { File as IonicNativeFile } from '@ionic-native/file';
// import { Camera, CameraOptions } from '@ionic-native/camera';

import firebase from 'firebase';
import { Gallery } from "../../media/file-system/gallery/gallery.impl";
import { Upload } from "../../media/upload/upload.impl";
import { UploadModal } from "../../media/upload-modal/upload-modal";
import { UploadLoader } from "./upload-loader";
import { MediaListItemOptions } from "../../media/media-list/media-list-item-options";
import { MediaProvider } from "../../providers/media-provider";
import { Media } from "../../models/media";


/**
 * Generated class for the Teacher page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class Teacher {

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private mediaProvider: MediaProvider,
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
    this.mediaProvider.add(new Media(title, url))
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

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

  medias: FirebaseListObservable<any>;
  storageDirectory: string = '';

  private imageSrc: string = "";

  firestore = firebase.storage();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    af: AngularFire,
    @Inject(Gallery) public gallery,
    @Inject(Upload) public upload,
    private uploadLoader: UploadLoader,
    private mediaListItemOptions: MediaListItemOptions,
    public modalCtrl: ModalController) {

    this.medias = af.database.list('/medias');

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
    this.medias.push({
      title: title,
      url: url
    });
  }


  private showError(): void {
    let alert = this.alertCtrl.create({
      title: 'An error occured',
      subTitle: "Try again later please",
      buttons: ['OK']
    });
    alert.present();
  }



  showOptions(songId: string, songTitle: string) {
    this.mediaListItemOptions.showOptions(this.medias, songId, songTitle)
  }



}

import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
//import { File, Entry } from '@ionic-native/file';
import { File as IonicNativeFile } from '@ionic-native/file';
// import { Camera, CameraOptions } from '@ionic-native/camera';

import firebase from 'firebase';
import { Gallery } from "../../media/filesystem/gallery/gallery.impl";
import { Upload } from "../../media/upload/upload.impl";
import { UploadLoader } from "./uploadloader";

declare var cordova: any;

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

  media: FirebaseListObservable<any>;
  storageDirectory: string = '';

  private imageSrc: string = "";

  firestore = firebase.storage();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    af: AngularFire,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    @Inject(Gallery) public gallery,
    @Inject(Upload) public upload,
    private uploadLoader: UploadLoader,
    public loadingCtrl: LoadingController,
    private file: IonicNativeFile) {

    this.media = af.database.list('/media');


    this.platform.ready().then(() => {

      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teacher');
  }

  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            //this.uploadimage()

            this.songs.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }



  private openGallery(): void {

    this.gallery.load()
      .then((filePath: string) => this.openModal(filePath))
      .catch((err: Error) => {
        alert("gallery err")
        alert(err)
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


  uploadimage(filePath: string, mediaTitle: string) {

    this.uploadLoader.show()

    this.upload.upload(filePath, this.uploadLoader.onProgress)
      .then((res) => {
        alert(res.downloadURL)
        this.media.push({
          title: mediaTitle,
          url: res.downloadURL
        });
        alert(JSON.stringify(res))
        this.uploadLoader.dismiss()
        let alert2 = this.alertCtrl.create({
          title: 'Ok',
          buttons: ['OK']
        });
        alert2.present();

      })
      .catch((err) => {
        this.uploadLoader.dismiss()
        let alert = this.alertCtrl.create({
          title: 'KO',
          subTitle: JSON.stringify(err),
          buttons: ['OK']
        });
        alert.present();
      })

  }


  // private showAlert(msg: string): void {
  //   let alert = this.alertCtrl.create({
  //     title: msg,
  //     subTitle: msg,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }



  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeMedia(songId);
          }
        }, {
          text: 'Update title',
          handler: () => {
            this.updateMedia(songId, songTitle);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeMedia(songId: string) {
    this.media.remove(songId);
  }

  updateMedia(songId, songTitle) {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.media.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}

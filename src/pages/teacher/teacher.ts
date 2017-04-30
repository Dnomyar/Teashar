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

  songs: FirebaseListObservable<any>;
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

    this.songs = af.database.list('/songs');


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


  uploadimage(filePath: string) {

  private openGallery(): void {


    this.uploadLoader.show()

    this.upload.upload(filePath, progress)
      .then((res) => {
        loader.dismiss()
        let alert = this.alertCtrl.create({
          title: 'Ok',
          buttons: ['OK']
        });
        alert.present();

      })
      .catch((err) => {
        loader.dismiss()
        let alert = this.alertCtrl.create({
          title: 'KO',
          subTitle: JSON.stringify(err),
          buttons: ['OK']
        });
        alert.present();
      })

  }


  private openGallery(): void {

    this.gallery.load()
      .then((filePath: string) => {
        this.uploadimage(filePath)
        //alert(filePath)
      })
      .catch((err: Error) => {
        alert(err)
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
            this.removeSong(songId);
          }
        }, {
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
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

  removeSong(songId: string) {
    this.songs.remove(songId);
  }

  updateSong(songId, songTitle) {
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
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}

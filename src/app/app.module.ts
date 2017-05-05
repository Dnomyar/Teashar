import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Teacher } from "../pages/teacher/teacher";
import { Student } from "../pages/student/student";
import { GalleryImpl, Gallery } from "../media/file-system/gallery/gallery.impl";
import { UploadImpl, Upload } from "../media/upload/upload.impl";

import { AngularFireModule } from 'angularfire2';

import { firebaseConfig } from './app.firebase.conf.ts'
import { UploadModal } from "../media/upload-modal/upload-modal";
import { UploadLoader } from "../pages/teacher/upload-loader";
import { MediaListItemOptions } from "../media/media-list/media-list-item-options";
import { RandomGenerator } from "../util/random-generator";
import { StoryProvider } from "../providers/story-provider";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Teacher,
    Student,
    UploadModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Teacher,
    Student,
    UploadModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Camera,
    MediaListItemOptions,
    UploadLoader,
    RandomGenerator,
    StoryProvider,
    { provide: Gallery, useClass: GalleryImpl },
    { provide: Upload, useClass: UploadImpl },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

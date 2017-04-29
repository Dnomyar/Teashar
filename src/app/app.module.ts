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

import { AngularFireModule } from 'angularfire2';

import { firebaseConfig } from './app.firebase.conf.ts'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Teacher,
    Student
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
    Student
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

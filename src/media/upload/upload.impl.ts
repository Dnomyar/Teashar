
import { Injectable, InjectionToken } from "@angular/core";
import { File as IonicNativeFile } from '@ionic-native/file';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';

import { Upload as IUpload } from './upload'
import { RandomGenerator } from "../../util/random-generator";



@Injectable()
export class UploadImpl implements IUpload {

  private firestore: firebase.storage.Storage;

  constructor(private file: IonicNativeFile, private randomGen: RandomGenerator) {
    this.firestore = firebase.storage();
  }

  // Upload file to firebase
  upload(filePath: string, progress: (number) => void): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.resolveLocalFile(filePath)
        .then(blob => this.loadInArrayBuffer(blob))
        .then(blob => this.putToFirebase(progress)(blob))
        .then(resolve)
        .catch(reject)
    })
  }

  // Get local file from `filePath`
  private resolveLocalFile(filePath: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.file.resolveLocalFilesystemUrl(filePath)
        .then((res: any) => res.file(file => resolve(file)))
        .catch(reject)
    })
  }

  // Use an FileReader to load file
  private loadInArrayBuffer(blob): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      reader.onloadend = (evt: any) => {
        const imgBlob = new Blob([evt.target.result], { type: 'image/png' });
        resolve(imgBlob)
      }
      reader.onerror = reject
    })
  }

  // Put the blob created to firebase
  private putToFirebase(progress: (number) => void): (Blob) => firebase.storage.UploadTask {
    return (blob: Blob) => {

      const imageName = this.randomGen.gererate()
      const imageStore = this.firestore.ref().child(imageName)
      const uploadTask = imageStore.put(blob)

      // Use Observable.interval to know progress
      Observable.interval(100)
        .subscribe(_ => {
          const snapshot = uploadTask.snapshot
          if (snapshot.totalBytes === 0) {
            progress(0)
          } else {
            const progressPercent =
              Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            progress(progressPercent);
          }
        })

      return uploadTask
    }
  }


}
export const Upload = new InjectionToken<IUpload>("Upload");

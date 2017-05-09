import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StoryModalAdd {

  constructor(private alertCtrl: AlertController) {
  }
  

  show(): Observable<any> {

    return Observable.create(obs => {
      let alert = this.alertCtrl.create({
        title: 'Add a story',
        inputs: [
          {
            name: 'title',
            placeholder: 'My story'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              obs.complete()
            }
          },
          {
            text: 'Add story',
            handler: data => {
              obs.next(data)
            }
          }
        ]
      });
      alert.present();
    })

  }

}

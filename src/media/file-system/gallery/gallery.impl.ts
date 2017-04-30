import { Camera, CameraOptions } from '@ionic-native/camera';


import { Gallery as IGallery } from './gallery'
import { Injectable, InjectionToken } from "@angular/core";


@Injectable()
export class GalleryImpl implements IGallery {

  constructor(private camera: Camera) { }


  load(): Promise<string> {
    const options: CameraOptions = {
      //quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //mediaType: this.camera.MediaType.PICTURE
    }

    return this.camera.getPicture(options)
  }


}
export const Gallery = new InjectionToken<IGallery>("Gallery");

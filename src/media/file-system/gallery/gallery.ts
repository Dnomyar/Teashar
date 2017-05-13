import { Camera, CameraOptions } from '@ionic-native/camera';


import { Injectable } from "@angular/core";


@Injectable()
export class Gallery {

  constructor(private camera: Camera) { }


  takePicture(): Promise<string> {
    return this.load(this.camera.PictureSourceType.CAMERA)
  }

  pickFromGallery(): Promise<string> {
    return this.load(this.camera.PictureSourceType.PHOTOLIBRARY)
  }

  private load(sourceType): Promise<string> {
    const options: CameraOptions = {
      //quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      //mediaType: this.camera.MediaType.PICTURE
    }

    return this.camera.getPicture(options)
  }


}

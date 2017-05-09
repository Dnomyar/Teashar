import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Story } from './story';

@NgModule({
  declarations: [
    Story,
  ],
  imports: [
    IonicPageModule.forChild(Story),
  ],
  exports: [
    Story
  ]
})
export class StoryModule {}

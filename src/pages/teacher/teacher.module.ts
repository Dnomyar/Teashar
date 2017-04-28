import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Teacher } from "./teacher";

@NgModule({
  declarations: [
    Teacher,
  ],
  imports: [
    IonicPageModule.forChild(Teacher),
  ],
  exports: [
    Teacher
  ]
})
export class TeacherModule { }

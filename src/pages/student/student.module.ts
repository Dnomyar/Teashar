import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Student } from './student';

@NgModule({
  declarations: [
    Student,
  ],
  imports: [
    IonicPageModule.forChild(Student),
  ],
  exports: [
    Student
  ]
})
export class StudentModule {}

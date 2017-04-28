import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Teacher } from "../teacher/teacher";
import { Student } from "../student/student";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private teacherPage: any;
  private studentPage: any;

  constructor(public navCtrl: NavController) {
    this.teacherPage = Teacher
    this.studentPage = Student
  }

}

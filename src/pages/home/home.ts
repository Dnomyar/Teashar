import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Teacher } from "../teacher/teacher";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private teacherPage: any;

  constructor(public navCtrl: NavController) {
    this.teacherPage = Teacher
  }

}

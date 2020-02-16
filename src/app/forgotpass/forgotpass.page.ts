import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {

  constructor (
    private NavCtrl : NavController,
    private Auth:AuthService
    ) {}

  goToLoginPage (){
    // this.NavCtrl.navigateBack('login');
    this.NavCtrl.back();
  }
  test (){
    this.NavCtrl.navigateBack('forgotpass2');
  }


  ngOnInit() {
  }

}

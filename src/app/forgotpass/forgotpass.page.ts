import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {

  constructor (private NavCtrl : NavController) {}
  goToLoginPage (){
    this.NavCtrl.navigateBack('login');
  }
  test (){
    this.NavCtrl.navigateBack('forgotpass2');
  }


  ngOnInit() {
  }

}

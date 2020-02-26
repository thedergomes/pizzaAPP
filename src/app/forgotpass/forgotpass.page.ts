import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {

  pregunta: string = "";
  respuesta: string = "";
  password: string = "";
  mail: string = "";
  error: any = {};

  constructor (
    private NavCtrl : NavController,
    private authService:AuthService,
    ) {}

  goToLoginPage (){
    // this.NavCtrl.navigateBack('login');
    this.NavCtrl.back();
  }
  getPreguntaSecreta (){
    this.authService.getSecretQuestion({email: this.mail}).then(data => {
      this.pregunta = data;
      this.error = {};
    }).catch(error => {
      this.error = error.error.error;
      console.log(this.error);
    });
  }

  sendPreguntaSecreta () {
    this.authService.resetPassword({email: this.mail, answer: this.respuesta, password: this.password}).then(data => {
      this.NavCtrl.back();
    }).catch(error => {
      this.error = error.error.error;
      console.log(error);
    });
  }

  ngOnInit() {
  }

}

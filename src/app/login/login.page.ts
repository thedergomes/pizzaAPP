import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NavController, LoadingController } from '@ionic/angular';
// import { RegisterService } from '../services/register.service';
import { AuthService } from '../services/auth.service';



export class Error
{
  password:Array<string> = [];
  email:Array<string> = [];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  // errors:Error = new Error();
  // email:String = "";
  // password:String = "";


  public myform: FormGroup;
  submitted:boolean = false;
  error:boolean = false;
  
  // {
  //   "email": "enmarval@example.com",
  //   "password": "Linux12345@"
  // }
  constructor( private navCtrl : NavController, 
    public restProvider: AuthService, 
    private loadingCtrl:LoadingController,
    public fb:FormBuilder) {}

    goToSignInPage () {
      this.navCtrl.navigateForward('register');
    }
    goToSplashPage() {
      this.navCtrl.navigateBack('splash');
    }
    goToForgotPassPage() {
      this.navCtrl.navigateForward('forgotpass');
    }
    ngOnInit() {
      this.myform = this.fb.group({
        // email:new FormControl('')
        email:new FormControl('', [Validators.required, Validators.email]),
        password:new FormControl('', Validators.required),
        // email:['', Validators.required],
        // password:['', Validators.required]
      });
    }

    get email(){ return this.myform.get('email'); }

    get password(){ return this.myform.get('password'); }

    onSubmit(values:any){
      console.log(values);
    }

    // loading = this.loadingCtrl.create({
    //   message:'Por favor espere...',
    //   cssClass:''
    // });

    async login() {
      this.submitted = true;
      this.error = false;

      // if (this.email) {
      //   this.errors.email = []
      // }

      if (this.myform.invalid) {
        return;
      }

      let loading = await this.loadingCtrl.create({
        spinner:"circular",
        message:'Por favor espere...',
        cssClass:''
      });

      loading.present();

      // this.restProvider.login({
      //   email:this.email,
      //   password:this.password,
      // })
      let json = this.myform.value;
      console.log(json);
      this.restProvider.login(json)
      .then(data => {
        console.log("then");
        console.log(data);

        localStorage.setItem("token", (data as any).token);
        // console.log((data as any).token);
        // console.log(this.restProvider.dataUser());
        this.navCtrl.navigateForward('home');
        // console.log(localStorage.getItem("token"));
      }).catch(error => {
        this.error = true;
        // this.errores = error.error.error;
        console.log(error.error.error);
        // if (error.error.error == 'Unauthorized'){
        //   this.errors.password = [];
        //   this.errors.email = ["Usuario o contraseña invalido"];
        // }else{
        //   this.errors = error.error.error;
        // }
      }).finally(()=>{
        loading.dismiss();
      });
    }

}

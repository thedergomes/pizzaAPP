import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController} from '@ionic/angular';
// import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { AuthService } from '../services/auth.service';

// export interface RegisterErrors {
//   name?: string [];
//   email?: string [];
//   password?: string [];
//   c_password?: string [];
// }
export class RegisterErrors {
  name: string [];
  email: string [];
  password: string [];
  c_password: string [];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  // name:string = "";
  // email:string = "";
  // password:string = "";
  // c_password:string = "";

  // errores: RegisterErrors = {};
  errores: RegisterErrors = new RegisterErrors();
  submitted:boolean = false;
  public myform: FormGroup;

  constructor(public navCtrl: NavController, 
    public restProvider: AuthService, 
    private loadingCtrl:LoadingController,
    public fb:FormBuilder) {
  }

  goToLoginPage() {
    this.navCtrl.navigateBack('login');
  }
  ngOnInit() {
    const notSame:ValidatorFn = (group:FormGroup):
    ValidationErrors|null =>{
      let pass = group.get('password').value;
      let c_pass = group.get('c_password').value;

      return pass === c_pass ? null : { notSame:true }
    }

    this.myform = this.fb.group({
      name:new FormControl('', Validators.required),
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', Validators.required),
      c_password:new FormControl('', Validators.required),
      question:new FormControl('', Validators.required),
      answer:new FormControl('', Validators.required),
      
    },{
        validator: notSame
    });
  }

  // MustMatch(group:FormGroup)
  // {
  //   let pass = group.get('password').value;
  //   let c_pass = group.get('c_password').value;
  //   console.log(pass);
  //   console.log(c_pass);
  //   console.log(pass === c_pass);
  //   return pass === c_pass ? null : { notSame:true }
  // }


  async addUser() {
    console.log(this.myform.value);
    console.log(this.myform.invalid);
    this.submitted = true;

    if (this.myform.invalid) {
      return;
    }

    let loading = await this.loadingCtrl.create({
      spinner:"circular",
      message:'Por favor espere...',
      cssClass:''
    });

    loading.present();

    this.restProvider.addUser(this.myform.value)
    .then(data => 
    {
      console.log(data);
      localStorage.setItem("token", (data as any).token);
      this.navCtrl.navigateForward('home');

    }).catch((error) => {
      this.errores = error.error.error;
      // let errores = error.error.error;
      console.log(this.errores);
    }).finally(()=>{
      loading.dismiss();
    });

    // this.restProvider.addUser({
    //   name:this.name,
    //   email:this.email,
    //   password:this.password,get('c_password')
    //   c_password:this.c_password
    // })
    // .then(data => {
    //   console.log(data);
    // }).catch((error) => {
    //   this.errores = error.error.error;
    //   console.log(this.errores);
    // });
  }


  get name(){ return this.myform.get('name'); }
  get email(){ return this.myform.get('email'); }
  get password(){ return this.myform.get('password'); }
  get c_password(){ return this.myform.get('c_password'); }
  get question(){ return this.myform.get('question'); }
  get answer(){ return this.myform.get('answer'); }
  
  
}

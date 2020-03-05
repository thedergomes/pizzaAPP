import { Component} from '@angular/core';
import { NavController} from '@ionic/angular';
import { MenusService } from '../services/menus.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // token = localStorage.getItem('token');
  token:string = "";
  promotions: any = [];

  constructor(public navCtrl: NavController, private menus:MenusService,) {}
  goToMenuPage() {
    this.navCtrl.navigateForward('menu');  
  }
  goToLoginPage() {
    this.navCtrl.navigateForward('login');  
  }
  goToTicketPage() {
    this.navCtrl.navigateForward('ticket');  
  }
  goToOrdersPage() {
    this.navCtrl.navigateForward('orders');  
  }
  goToReservationPage() {
    this.navCtrl.navigateForward('reservations');  
  }
  goToPromotionsPage() {
    this.navCtrl.navigateForward('promotion');
  }
  goToSettingPage() {
    this.navCtrl.navigateForward('setting');
  }

  ionViewWillEnter()
  {
    console.log('carga');
    this.menus.getPromotions().then( data => {
      this.promotions = data.data;
    });
    this.token = localStorage.getItem('token');
  }

  singOut() 
  {
    localStorage.removeItem("token");
    localStorage.removeItem("details");

    console.log("singOut");
    // this.token = null;

    this.navCtrl.navigateForward('splash');
  }

  async presentAlert(item) {
    let param:NavigationExtras={
      queryParams:{
        product:JSON.stringify(item)
      }
    }

    this.navCtrl.navigateForward('order-food', param);
  }
}


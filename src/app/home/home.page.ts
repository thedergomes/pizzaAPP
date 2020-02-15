import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token = localStorage.getItem('token');

  constructor(public navCtrl: NavController) {}
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

  singOut() 
  {
    localStorage.removeItem("token");
    localStorage.removeItem("details");

    console.log("singOut");
    // this.token = null;

    this.navCtrl.navigateForward('splash');
  }
}


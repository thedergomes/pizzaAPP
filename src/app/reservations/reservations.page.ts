import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from '@ionic/angular';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
 
  Reservations:Array<Reservation>;

  constructor( private navCtrl: NavController, private reservationService : ReservationService ) { 
  }
  goToHomePage() {
    this.navCtrl.navigateForward('home');  
  }
  ngOnInit() {
    this.reservations();
  }
  reservations(){
    // if (this.details == null) {
    //   return;
    // }

    // let orders = new Array<Detail>();

    // this.details.forEach(element => {
    //   let detail = new Detail();
    //   detail.food_id = element.id;
    //   detail.quantity = element.quantity;
      
    //   orders.push(detail);
    // });

    // console.log(orders);
    this.reservationService.getReservation()
      .then(async data => {
        console.log(data);
        this.Reservations = data;

        console.log(this.Reservations);

        // localStorage.removeItem('details');

        // await this.presetAlert();
        // this.details = null;

        
      }).catch(error => {
        console.log(error);
        // this.error = true;
        // console.log(error.error.error);
      });
  }
}

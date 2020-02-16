import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from '@ionic/angular';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';

import { ModalController } from '@ionic/angular';
import { AddReservationPage } from '../add-reservation/add-reservation.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
 
  listReservation:Array<Reservation> = new Array<Reservation>();

  constructor( 
    private navCtrl: NavController, 
    private reservationService : ReservationService ,
    public modalController: ModalController,
    public loadingController: LoadingController
    ) { 
  }
  goToHomePage() {
    this.navCtrl.navigateForward('home');  
  }
  ngOnInit() {
    this.reservations();
  }

  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     message: 'Por favor espere...',
  //   });
  //   await loading.present();
  // }

  async addReservations(){
    const modal = await this.modalController.create({
      component: AddReservationPage
    });

    await modal.present();
    let a = await modal.onWillDismiss();
    this.listReservation.push(a.data as Reservation);
    console.log(a);

  }

  cancel(id){
    this.reservationService.deleteReservation(id)
      .then(async data => 
      {
      this.listReservation = this.listReservation.filter(elem => elem.id != id);
        // console.log(data);

      }).catch(error => {
        console.log(error);
      });
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
        console.log(this.listReservation);
        this.listReservation = data.data;

        console.log(this.listReservation);

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

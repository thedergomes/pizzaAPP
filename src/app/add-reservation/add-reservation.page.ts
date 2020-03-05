import { Component, OnInit } from '@angular/core';

import { MenusService } from '../services/menus.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.page.html',
  styleUrls: ['./add-reservation.page.scss'],
})
export class AddReservationPage implements OnInit {

  date:string = "";
  seats:number = 1;
  comment:string = "";

  constructor(
    private menus:MenusService,
    public modalCtrl: ModalController
  ) { }

  cancel(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  addReservation(){
    console.log(this.date);
    let a = Math.round(new Date(this.date).getTime()/1000);

    this.menus.reservation({
      // date:this.date,
      date:a,
      seats:this.seats,
      comments:this.comment,
    })
    .then(data => {
      console.log("then");
      console.log(data);
      this.modalCtrl.dismiss({
        'dismissed': true,
        'data':data
      });

    }).catch(error => {
      // this.errores = error.error.error;
      console.log(error.error.error);
    });
  }

  ngOnInit() {
  }

}
